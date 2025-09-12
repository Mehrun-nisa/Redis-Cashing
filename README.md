# ⚡ Redis Caching with NestJS

This project demonstrates how to implement **Redis caching** in a NestJS application using **MySQL** as the database layer with both **Sequelize** and **Knex**.  
It focuses on **dependency injection, providers, and modular architecture** in NestJS while showcasing caching strategies.

---

## 🚀 Features
✅ Fetch user data (ID, name, email) from MySQL  
✅ Store user data in Redis cache for faster retrieval  
✅ Use **Sequelize (ORM)** and **Knex (query builder)** for DB operations  
✅ Demonstrates NestJS **providers, exports, and dependency injection**  
✅ Explains why spreading providers (`...knexProvider`) matters  

---

## 🛠 Tech Stack
- 🟢 **NestJS** – Node.js framework  
- 🗄️ **MySQL** – Relational database  
- 📦 **Sequelize** – ORM for models  
- 🔨 **Knex.js** – SQL query builder  
- ⚡ **Redis** – In-memory caching  

---

## ⚙️ Installation & Setup

### 🔹 Prerequisites
- [Node.js](https://nodejs.org/) >= 18  
- [MySQL](https://dev.mysql.com/downloads/) running locally (`localhost:3306`)  
- [Redis](https://redis.io/download) running locally (`localhost:6379`) or via Docker  

---

### 📦 Install Dependencies
```bash
# NestJS core
npm install @nestjs/common @nestjs/core @nestjs/sequelize

# Database
npm install mysql2 sequelize sequelize-typescript knex

# Redis client
npm install ioredis

# Logging & utils
npm install @nestjs/config @nestjs/testing
⚡ Run Redis
bash
Copy code
# Local
redis-server

# OR with Docker
docker run --name redis -p 6379:6379 -d redis
🗄️ Run MySQL
Make sure MySQL server is running, then create a database:

sql
Copy code
CREATE DATABASE redis_demo;
▶️ Run App
bash
Copy code
npm run start:dev
🔑 How It Works
Check cache in Redis

ts
Copy code
const users = await this.redis.get('users');
if (users) return JSON.parse(users);
If cache miss → Fetch from DB (Sequelize or Knex):

ts
Copy code
const dbUsers = await this.userModel.findAll(); // Sequelize
const dbUsers = await this.knex.select('*').from('users'); // Knex
Save result to Redis with 30s expiration:

ts
Copy code
await this.redis.set('users', JSON.stringify(dbUsers), 'EX', 30);
⚡ Next request will fetch directly from Redis (much faster).

📌 Example Endpoints
GET /redis/users/seq → Fetch users via Sequelize + Cache in Redis

GET /redis/users/knex → Fetch users via Knex + Cache in Redis

Logs show whether it was a cache hit or cache miss.

💡 Dependency Injection Notes
A provider is anything that can be injected into another class.

If UserService needs ModuleService, then UserModule must provide & export ModuleService so that any module importing UserModule also gets it.

ts
Copy code
@Module({
  providers: [UserService, ModuleService],
  exports: [UserService, ModuleService],
})
export class UserModule {}
Why ...knexProvider?
❌ providers: [knexProvider] → registers one array, not the contents.

✅ providers: [...knexProvider] → registers each provider object correctly.

🧠 Key Learnings
Providers keep code modular & reusable.

Use Redis caching to reduce DB load.

Always set expiration (EX) to avoid stale or bloated cache.

Spreading providers (...) is required in NestJS.

📚 References
NestJS Docs - Providers

Redis Docs

Sequelize ORM

Knex.js