# VirtuWear

## Description
VirtuWear is a groundbreaking e-commerce fashion platform that revolutionizes online shopping with its interactive 3D outfit configurator. Developed using TypeScript, React, and Next.js, it offers an immersive and intuitive shopping experience, allowing users to visualize fashion choices in a dynamic 3D environment. Enhanced with cutting-edge technologies, including server-side rendering (SSR) for swift page loads and Redis for efficient caching of public content like product lists, VirtuWear provides a fast, responsive, and engaging user experience. It's not just an e-commerce site; it's an innovative solution designed to transform how people shop for clothes online.

## Motivation
My journey with VirtuWear began with a clear vision: to revolutionize the online shopping experience. I recognized the limitations of traditional e-commerce fashion platforms:
* Why should customers rely solely on mental visualization to imagine how outfits will come together?
* Why shouldn't online shopping offer the same level of interactive engagement as in-store experiences, allowing customers to explore and try products dynamically?
* Why isn't there a seamless integration between browsing anonymously and shopping with an account? Most platforms treat these two experiences disjointedly, causing inconvenience for users who wish to merge their selections.
* Why is the backend of many e-commerce sites not optimized for performance and scalability? As online shopping grows, many platforms struggle with database management, leading to slower response times and decreased user satisfaction.

By addressing these questions and challenges, VirtuWear aims to create a unique and superior online shopping experience that caters to the modern consumer’s needs. With its innovative 3D outfit configurator and robust backend, VirtuWear is not just a platform; it’s a solution to the gaps and limitations in the current e-commerce landscape.

## Quick Start
### Explore the Live Demo
Navigate to [VirtuWear Live Demo](https://ecommerce-project-liard.vercel.app/) to experience the interactive 3D outfit configurator and explore the user-friendly interface of the platform.
## Usage
### Key Features:
* 3D Outfit Configurator: Step into the future of fashion with the 3D Outfit Configurator. This feature allows you to visualize, mix, and match clothing items in a realistic 3D environment. Make informed fashion choices and add items directly to your cart with a single click.

* Seamless Shopping Experience: Experience a smooth and responsive shopping journey, thanks to Next.js server components and Server-Side Rendering (SSR) integration. This advanced technology ensures quick interactions and an efficient browsing experience.

* Advanced Cart System with Intelligent Integration: The cart system not only merges anonymous carts with user accounts for a seamless transition but also smartly manages cart lifecycles. Abandoned anonymous carts are periodically cleared through automated cron jobs, optimizing storage and performance.

* Robust Database Management and Secure Authentication: VirtuWear leverages TypeScript, Next.js Server Actions, Prisma ORM, MongoDB Atlas, and Redis for efficient and secure data management. Authentication is streamlined with Next Auth Google provider, ensuring safe and private user sessions.

## Contributing
### Set Up the Development Environment
1. Clone the repository:
```
git clone https://github.com/hunterlauder9601/VirtuWear.git
cd virtuwear
```
2. Install Dependencies:
`npm install`
3. Environment Variables:
VirtuWear requires certain environment variables, stored in a .env file. Create this file at the root of the project and include the following variables:
* DATABASE_URL: URL to your MongoDB instance.
* REDIS_URL: URL to your Redis instance.
* GOOGLE_CLIENT_ID: Your Google OAuth client ID for authentication.
* GOOGLE_CLIENT_SECRET: Your Google OAuth client secret.
* NEXTAUTH_URL: The URL where your Next.js app is running.
* NEXTAUTH_SECRET: A secret key for encrypting your NextAuth session.
Example .env file:
```
DATABASE_URL="your_mongodb_url"
REDIS_URL="your_redis_url"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
NEXTAUTH_URL="http://localhost:3000/"
NEXTAUTH_SECRET="your_nextauth_secret"
```
4. Obtaining Credentials:
* MongoDB Atlas: Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas/database) and create a cluster. In your cluster, navigate to 'Connect' and follow the instructions to get your connection string.
* Redis: For Redis, [Upstash](https://upstash.com/) is recommended. Sign up and create a Redis database to get your connection URL.
* Google OAuth Credentials: Go to the [Google Cloud Console](https://console.cloud.google.com/), create a project, and set up the OAuth consent screen. Under 'Credentials', create OAuth client ID credentials to obtain GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.
* NextAuth Setup: NEXTAUTH_URL should be the URL where your local or deployed Next.js app is running. NEXTAUTH_SECRET can be any long, secure string - you can generate one using an online tool.
**Note:** Do not use the example values for a production environment. Obtain your credentials for security and functionality.
5. Run the Platform Locally:
`npm run dev`
### Contributing to VirtuWear
Contributions are welcome! If you have ideas or code to share, please fork the repository and submit a pull request to the main branch with your enhancements.
