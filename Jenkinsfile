pipeline {
    agent any

    environment {
        IMAGE_NAME = "piyushnavghare/portfolio-site"
        TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/PiyushN-24/Portfolio-Site.git'
            }
        }

        stage('NPM Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('NPM Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('NPM Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$TAG .'
            }
        }

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

        stage('Docker Push') {
            steps {
                sh '''
                    docker push $IMAGE_NAME:$TAG
                    docker tag $IMAGE_NAME:$TAG $IMAGE_NAME:latest
                    docker push $IMAGE_NAME:latest
                '''
            }
        }
    }
}
