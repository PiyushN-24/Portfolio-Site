pipeline {
    agent any

    environment {
        IMAGE_NAME = "piyushnavghare/portfolio-site"
        TAG = "${BUILD_NUMBER}"
        SONARQUBE_SERVER = "sonar-local"
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
    }

    tools {
        sonarQubeScanner "sonar-scanner"
        nodejs "nodejs"   
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/PiyushN-24/Portfolio-Site.git'
            }
        }

        /* ---------------- SECURITY: PRE-COMMIT + GITLEAKS ---------------- */

        stage('Pre-Commit Security Scan (Gitleaks)') {
            steps {
                sh '''
                   echo "Using pre-commit from: $(which pre-commit)"
                   pre-commit run --all-files
                '''
            }
        }

        /* ---------------- DEPENDENCIES ---------------- */

        stage('NPM Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('NPM Test') {
            steps {
                sh 'npm test || true'
            }
        }

        /* ---------------- SONARQUBE ---------------- */

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('sonar-local') {
                   sh '''
                      sonar-scanner \
                         -Dsonar.projectKey=portfolio-site \
                         -Dsonar.projectName=portfolio-site \
                         -Dsonar.sources=. 
                   '''
                }
            }
        }

        stage('SonarQube Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        /* ---------------- DOCKER BUILD ---------------- */

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t $IMAGE_NAME:$TAG .
                    docker tag $IMAGE_NAME:$TAG $IMAGE_NAME:latest
                '''
            }
        }

        /* ---------------- TRIVY SCAN ---------------- */

        stage('Trivy Image Scan') {
            steps {
                sh '''
                    trivy image --severity HIGH,CRITICAL --exit-code 1 $IMAGE_NAME:$TAG || true
                '''
            }
        }

        /* ---------------- DOCKER LOGIN ---------------- */

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        /* ---------------- DOCKER PUSH (OPTIMIZED) ---------------- */

        stage('Docker Push') {
            steps {
                sh '''
                    docker push $IMAGE_NAME:$TAG
                    docker push $IMAGE_NAME:latest
                '''
            }
        }
    }

    post {
        always {
            sh 'docker system prune -af || true'
        }
        success {
            echo "✅ Pipeline completed successfully"
        }
        failure {
            echo "❌ Pipeline failed"
        }
    }
}
