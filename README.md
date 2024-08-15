# **Walmart Enhanced Shopping Experience**

## **Overview**

This project is a comprehensive enhancement to the Walmart website, offering users a more interactive and inclusive shopping experience. It combines frontend and backend development with a powerful classification model to improve customer feedback, a Chrome extension to assist colorblind users, and unique features like credit rewards for useful feedback and donation options.

## **Features**

1. **Customer Feedback Classification**:
   - **Model**: The project employs a BERT-based classification model to categorize customer feedback into "Useful" or "Garbage."
   - **Rewards System**: Customers who provide useful feedback are awarded credits. Once they accumulate enough credits, they can redeem them for special offers.

2. **Chrome Extension for Colorblind Users**:
   - **Purpose**: The Chrome extension is designed to enhance accessibility for colorblind users, allowing them to better interact with the website's interface.
   - **Integration**: This extension works seamlessly with the Walmart website, ensuring all users, regardless of color vision, have an equitable shopping experience.

3. **Donation Feature**:
   - **Philanthropy**: Users are given the option to donate a portion of their credits or money towards helping those in need, directly through the website.

## **Project Structure**

### **Frontend**

- **Framework**: The frontend is built using React with Vite for fast development and optimization.
- **Key Components**:
  - **Customer Feedback Interface**: Allows users to submit feedback on products, which is then classified by the backend.
  - **Colorblind Accessibility Features**: Implements enhanced visual tools for users with color vision deficiencies.
  - **Reward System**: Displays user credits and enables redemption of offers.

- **Directory Structure**:
  - `src/`: Contains all the source code for the frontend components.
  - `index.html`: The main HTML file.
  - `vite.config.js`: Configuration file for Vite.

### **Backend**

- **Framework**: The backend is powered by Node.js and Express.
- **Key Features**:
  - **API Endpoints**: Serve the classification model, manage user feedback, and handle user rewards.
  - **Database Management**: Manages user data, feedback, and reward points.
  - **Donation Processing**: Handles transactions for donations made by the users.

- **Directory Structure**:
  - `Controllers/`: Contains the logic for handling requests and responses.
  - `DB/`: Database configuration and models.
  - `router/`: Defines the API endpoints.
  - `model/`: Houses the classification model and related functions.
  - `server.js`: Main server file to run the backend.

## **Installation**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo
   
2. **Frontend Dependencies Installation**:
```bash
# Navigate to the frontend directory
cd frontend

# Install the necessary dependencies
npm install

# Start the development server
npm run dev



3. **Install Backend Dependencies**:
```bash
# Navigate to the backend directory
cd ../backend

# Install the necessary dependencies
npm install

# Start the backend server
npm start

4. **Running the Project**
After setting up both the frontend and backend, the project should be up and running locally. You can access the frontend at `http://localhost:3000` and the backend API endpoints at `http://localhost:5000` (or the respective ports if configured differently).

Ensure that both servers are running simultaneously to allow proper communication between the frontend and backend.


## **Conclusion**
This project not only enhances the shopping experience for all Walmart users but also introduces unique features like a feedback-based reward system and inclusive tools for colorblind users. By integrating BERT for feedback classification and adding charitable donation options, the project aims to provide a socially responsible and user-friendly platform.
