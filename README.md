---

# Gear Rush || Bike Shop

Gear Rush is an online motorcycle shop where users can order their favorite bikes and make payments. The platform includes a dashboard for both admins and customers.

In this project, I have used Redux Toolkit, RTK Query, React with Vite, TypeScript, Tailwind CSS, and some Ant Design components.


## Features

- **Customer Management**:

  - Customer can register and login.
  - Customer can order bike.
  - Customer can see order track .
  - Customer can give reviews .

- **Admin Management**:

  - Admin can add bike as product.
  - Admin can delete any a bike post .
  - Admin can update any post .
  - Admin can manage users like block them or deactived them.




## Installation

### Prerequisites

- Node.js
- MongoDB (or a MongoDB cloud service like Atlas)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/salekmasudparvez/l2-a4-client-bikeshop.git
   ```

2. Navigate to the project folder:

   ```bash
   cd l2-a4-client-bikeshop
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your **MongoDB** connection in the `app.ts` file (or use a service like MongoDB Atlas):

   ```typescript
   mongoose.connect('mongodb://localhost:27017/api/blogs')
   ```

5. Run the application:

- Manage All environments variables from [.env.example](https://a3-l2-blog-backend.vercel.app/) file
  
6. Run the application:

   ```bash
   npm run dev
   ```

   The app will start on **http://localhost:5000**.

## Live Server

You can view the live version of the project here:

[Live Server](https://gearrush.netlify.app)

