# Contact Management Application

## **Overview**
This app is a quick project I put together to showcase my skills. It's a simple yet efficient contact management system using Angular 17 and NodeJS.

## **Features**

- **Contact List Management**: View a list of contacts with brief information.
- **Add Contacts**: Manually add contacts using a reactive form with validation.
- **Generate Random Contacts**: Add ten randomly generated contacts with a single click using data from [randomuser.me](https://randomuser.me).
- **View Contact Details**: Click on a contact to view detailed information, edit, or delete the contact.
- **Responsive Design**: Responsive UI using Bootstrap.
- **State Management**: Efficient state management with NGRX.
- **Reactive Programming**: Utilization of RXJS for handling asynchronous operations.
- **Unit Testing**: Comprehensive unit tests with Jasmine.

## **Technologies Used**

- **Frontend**:
  - Angular 17
  - NGRX
  - RXJS
  - Bootstrap

- **Backend**:
  - NodeJS
  - SQLite

- **Tools**:
  - Jasmine (for unit testing)

## **Installation and Setup**

### **Prerequisites**

Ensure you have the following installed on your local development environment:

- Node.js (version 14 or higher)
- Angular CLI
- SQLite

### **Backend Setup**

1. **Clone the Repository**:
    ```sh
    git clone git@github.com:sebastian311/contact-list.git
    cd <repository-directory>/backend
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Run the Backend Server**:
    ```sh
    node server.js
    ```

### **Frontend Setup**

1. **Navigate to Frontend Directory**:
    ```sh
    cd <repository-directory>/frontend/contact-list
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Run the Frontend Server**:
    ```sh
    ng serve
    ```

### **Running Tests**

To execute the unit tests, run:
```sh
ng test
