# CloudOps Microservice Platform

CloudOps Microservice Platform is a cloud-native e-commerce application built using a microservices architecture. The project demonstrates modern DevOps practices including containerization, orchestration, infrastructure as code, cloud deployment, CI/CD automation, and service-based application design.

The application provides a complete e-commerce workflow including product browsing, shopping cart, checkout, and order management.

---

## 📌 Project Overview

The application is divided into multiple independent services. The frontend communicates with the backend through an API Gateway, while the backend services communicate with each other and MongoDB.

The project was developed and tested locally using Docker and Docker Compose and was then deployed to AWS using Terraform, Amazon ECR, EC2, and Docker Compose.

### Architecture Flow

```text
                    ┌─────────────────────┐
                    │      Frontend       │
                    │   React + Vite      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     API Gateway     │
                    │       Nginx         │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
      ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
      │ User Service │ │Product       │ │Order Service │
      │   Flask      │ │Service       │ │   Flask      │
      └──────────────┘ │   Flask      │ └──────┬───────┘
                       └──────┬───────┘        │
                              │                 │
                              └────────┬────────┘
                                       ▼
                              ┌────────────────┐
                              │    MongoDB     │
                              └────────────────┘

🚀 Features
Product Management
Product Search
Shopping Cart
Checkout System
Order Management
Order Persistence
API Gateway
Independent Microservices
MongoDB Database
Docker Containerization
Docker Compose
Kubernetes Deployment Configuration
Terraform Infrastructure
AWS EC2 Deployment
Amazon ECR Container Registry
AWS Systems Manager (SSM)
GitHub Version Control
CI/CD Configuration
🛠️ Technology Stack
Technology	Purpose
React + Vite	Frontend application
Python Flask	Backend microservices
Nginx	API Gateway / routing
MongoDB	Database
Docker	Application containerization
Docker Compose	Multi-container application deployment
Kubernetes	Container orchestration
Terraform	Infrastructure as Code
AWS EC2	Cloud compute
Amazon ECR	Docker image registry
AWS VPC	Cloud networking
AWS Security Groups	Network access control
AWS IAM	Identity and access management
AWS SSM	Secure EC2 management
GitHub	Source code management
GitHub Actions	CI/CD configuration
Jenkins	CI/CD workflow
🧩 Microservices

The backend is divided into independent services.

1. User Service

Responsible for user-related operations.

Port: 5001
2. Product Service

Responsible for product data and product-related operations.

Port: 5002

The Product Service uses MongoDB for storing product information.

Example products:

Laptop
Mechanical Keyboard
Wireless Mouse
Monitor
3. Order Service

Responsible for creating and managing orders.

Port: 5003

The Order Service communicates with the Product Service and MongoDB.

4. API Gateway

The Gateway provides a single entry point for backend API requests.

Port: 8080

The gateway routes requests to the appropriate backend microservice.

5. Frontend

The frontend is developed using React and Vite.

The frontend provides:

Product listing
Product search
Quantity selection
Add to Cart
Cart management
Checkout
Order confirmation
Recent Orders
🐳 Docker Architecture

Each application component is containerized independently.

Frontend
   │
   ▼
Gateway
   │
   ├── User Service
   ├── Product Service
   └── Order Service
             │
             ▼
          MongoDB

Docker images are built separately for the application services and stored in Amazon ECR for cloud deployment.

🐳 Docker Compose

Docker Compose is used to run the complete application stack.

The Compose stack contains:

frontend
gateway
user-service
product-service
order-service
mongodb
Start the application
docker compose up -d
Build and start
docker compose up --build -d
Check running containers
docker compose ps
Stop the application
docker compose down
☸️ Kubernetes

The project contains Kubernetes configuration files for deploying the application using Kubernetes.

The Kubernetes configuration includes resources for:

Frontend
Gateway
User Service
Product Service
Order Service
MongoDB
ConfigMap
Secret
Namespace
Services
Deployments
Product seed job

Kubernetes manifests are available inside:

kubernetes/
☁️ AWS Deployment

The final application was deployed to AWS using Terraform, Amazon ECR, EC2, VPC, IAM, SSM, and Docker Compose.

AWS Architecture
                    AWS Cloud
                       │
                       ▼
                  ┌─────────┐
                  │   VPC   │
                  └────┬────┘
                       │
                       ▼
                ┌─────────────┐
                │Public Subnet│
                └──────┬──────┘
                       │
                       ▼
                ┌─────────────┐
                │ EC2 Instance│
                └──────┬──────┘
                       │
                       ▼
                Docker Compose
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
    Frontend        Gateway       Microservices
                                      │
                                      ▼
                                   MongoDB
🏗️ Infrastructure as Code

Terraform is used to provision and manage the AWS infrastructure.

Terraform manages resources including:

VPC
Public Subnet
Internet Gateway
Route Table
Route Table Association
Security Group
EC2 Instance
IAM Role
IAM Instance Profile

Terraform configuration is located inside:

terraform/
Terraform Files
terraform/
├── main.tf
├── provider.tf
├── variables.tf
├── outputs.tf
├── terraform.tfvars
└── .terraform.lock.hcl
Initialize Terraform
terraform init
Validate configuration
terraform validate
Create execution plan
terraform plan
Deploy infrastructure
terraform apply
View outputs
terraform output
📦 Amazon ECR

Docker images are stored in Amazon Elastic Container Registry (ECR).

The application uses ECR repositories for the microservices.

Repositories include:

cloudops/frontend
cloudops/gateway
cloudops/user-service
cloudops/product-service
cloudops/order-service
Deployment Flow
Docker Build
     │
     ▼
Docker Image
     │
     ▼
Amazon ECR
     │
     ▼
EC2 Instance
     │
     ▼
Docker Compose
     │
     ▼
Running Application
🔐 AWS Systems Manager

AWS Systems Manager Session Manager is used to access the EC2 instance without depending on an SSH private key for normal server management.

Example:

aws ssm start-session \
  --target <INSTANCE_ID> \
  --region eu-north-1

After connecting to the EC2 instance:

whoami

Check Docker:

docker --version

Check running services:

sudo docker compose ps

This provides a secure way to manage the deployed EC2 instance.

🌐 Application Access

After deployment, the frontend can be accessed using the public IP address of the EC2 instance.

Example:

http://<EC2_PUBLIC_IP>

The deployed application provides:

Product catalogue
Product search
Quantity selection
Shopping cart
Checkout
Order confirmation
Recent orders
🔌 API Endpoints

The application exposes backend functionality through the API Gateway.

Products
GET /products

Returns the available products.

Example response:

[
  {
    "id": 1,
    "name": "Laptop",
    "price": 65000,
    "stock": 10
  },
  {
    "id": 2,
    "name": "Mechanical Keyboard",
    "price": 3500,
    "stock": 25
  },
  {
    "id": 3,
    "name": "Wireless Mouse",
    "price": 1500,
    "stock": 40
  },
  {
    "id": 4,
    "name": "Monitor",
    "price": 18000,
    "stock": 15
  }
]
Orders

The Order Service handles order creation and retrieval through the API Gateway.

📁 Project Structure
cloudops-microservice-platform/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── vite.config.js
│
├── gateway/
│   ├── Dockerfile
│   └── nginx.conf
│
├── user-service/
│   ├── app.py
│   ├── db.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── product-service/
│   ├── app.py
│   ├── db.py
│   ├── seed.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── order-service/
│   ├── app.py
│   ├── config.py
│   ├── db.py
│   ├── Dockerfile
│   └── requirements.txt
│
├── kubernetes/
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── mongodb.yaml
│   ├── product-seed-job.yaml
│   ├── frontend/
│   ├── gateway/
│   ├── user-service/
│   ├── product-service/
│   └── order-service/
│
├── terraform/
│   ├── main.tf
│   ├── provider.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── terraform.tfvars
│
├── Docker-compose.yaml
├── README.md
├── Documentation.docx
├── .gitignore
└── .github/
    └── workflows/
        └── ci-cd.yml
▶️ Running Locally
Prerequisites

Install the following tools:

Docker
Docker Compose
Git
Node.js
Python
Kubernetes / Minikube
Terraform
AWS CLI
Clone Repository
git clone <YOUR_GITHUB_REPOSITORY_URL>

Move into the project directory:

cd cloudops-microservice-platform
Run Using Docker Compose

Build and start the complete application:

docker compose up --build -d

Check containers:

docker compose ps

Access the frontend:

http://localhost:3000
🧪 Application Verification

The deployment was tested at multiple levels.

1. Container Verification
docker compose ps

All required containers should show as running.

Expected services:

frontend
gateway
mongodb
order-service
product-service
user-service
2. API Verification

Inside the EC2 instance:

curl http://localhost:8080/products

The API should return the product data.

3. Frontend Verification

Open the EC2 public IP in a browser:

http://<EC2_PUBLIC_IP>

The CloudOps Microservice Platform frontend should load successfully.

4. Product Verification

The application displays:

Laptop
Mechanical Keyboard
Wireless Mouse
Monitor

The dashboard also displays:

Total Products
Total Orders
Total Stock
5. Shopping Cart Verification

Products can be added to the shopping cart.

The cart displays:

Product name
Price
Quantity
Total amount
Remove option
6. Checkout Verification

The checkout process collects customer information and allows the order to be placed.

7. Order Verification

After checkout, the application displays:

Order Placed Successfully!

The order is then visible under:

Recent Orders

The order contains:

Order ID
Product
Quantity
Total
Status
🔄 Complete Deployment Flow
Developer
    │
    ▼
GitHub Repository
    │
    ▼
Docker Build
    │
    ▼
Docker Images
    │
    ▼
Amazon ECR
    │
    ▼
Terraform
    │
    ▼
AWS VPC + EC2
    │
    ▼
AWS Systems Manager
    │
    ▼
Docker Compose
    │
    ├── Frontend
    ├── Gateway
    ├── User Service
    ├── Product Service
    ├── Order Service
    └── MongoDB
    │
    ▼
Live E-Commerce Application
🔄 CI/CD

The repository contains CI/CD configuration under:

.github/workflows/

The project also contains Jenkins-related configuration used during the DevOps workflow.

The general CI/CD flow is:

GitHub
   │
   ▼
CI/CD Pipeline
   │
   ▼
Build
   │
   ▼
Docker Image
   │
   ▼
Amazon ECR
   │
   ▼
Deployment
📊 Monitoring & Observability

The project is designed with DevOps monitoring and observability in mind.

Prometheus and Grafana can be integrated for:

Application metrics
Container metrics
Infrastructure monitoring
Dashboard visualization

Logging can be used to troubleshoot:

Application errors
Container failures
API issues
Service communication problems
🔒 Security

The AWS deployment uses several security mechanisms:

AWS IAM
IAM Instance Profile
AWS Systems Manager
Security Groups
Amazon ECR
VPC networking

For production environments:

SSH access should be restricted where possible.
Sensitive credentials should never be committed to GitHub.
AWS IAM permissions should follow the principle of least privilege.
HTTPS should be configured for production traffic.
📚 Documentation

Detailed deployment documentation with screenshots is included in:

Documentation.docx

The documentation covers:

Project overview
Project architecture
Terraform infrastructure
AWS VPC
AWS EC2
Amazon ECR
AWS Systems Manager
Docker Compose deployment
Container verification
API verification
Live application
Product listing
Shopping cart
Checkout
Successful order
Recent orders
📸 Project Screenshots

The complete screenshots and deployment evidence are available in the project documentation.

The screenshots demonstrate:

Project structure
Terraform configuration
Terraform outputs
AWS EC2 instance
Amazon ECR repositories
ECR Docker images
AWS SSM session
Docker version
Running Docker Compose services
Product API response
Live frontend
Product listing
Shopping cart
Checkout page
Successful order
Recent orders

For detailed screenshots, refer to:

Documentation.docx
🎯 Learning Outcomes

This project demonstrates practical experience with:

Microservices Architecture
REST APIs
React Frontend Development
Flask Backend Development
MongoDB
Docker
Docker Compose
Kubernetes
Terraform
AWS EC2
Amazon ECR
AWS VPC
AWS IAM
AWS Systems Manager
Git & GitHub
CI/CD
Cloud Deployment
Infrastructure as Code
API Gateway
Containerized Application Deployment
🚀 Future Improvements

Possible future improvements include:

HTTPS with a custom domain
Application Load Balancer
AWS Auto Scaling
Managed MongoDB / Amazon DocumentDB
Prometheus & Grafana monitoring
Centralized logging
Improved authentication and authorization
Automated ECR deployment pipeline
Production Kubernetes deployment
AWS ECS / EKS deployment
SSL/TLS configuration
Domain name integration
👨‍💻 Author

Vivek Rawat

CloudOps Microservice Platform

📄 License

This project is intended for educational, learning, and portfolio purposes.


**Bas is poore ek block ko copy karo → `README.md` me paste karo → save → Git add/commit/push.**
