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

# Local
redis-server

# OR with Docker
docker run --name redis -p 6379:6379 -d redis

---

### 🗄️ Run MySQL
Make sure MySQL server is running, then create a database:

# create database and table sql
CREATE DATABASE redis_demo;

▶️ Run App

npm run start:dev


## 🔑 How It Works
1. **Check cache in Redis**  
   const users = await this.redis.get('users');
   if (users) return JSON.parse(users);
If cache miss → Fetch from DB (Sequelize or Knex):

const dbUsers = await this.userModel.findAll(); // Sequelize
const dbUsers = await this.knex.select('*').from('users'); // Knex
Save result to Redis with 30s expiration:


await this.redis.set('users', JSON.stringify(dbUsers), 'EX', 30);
⚡ Next request will fetch directly from Redis (much faster).

💡 Dependency Injection Notes
A provider is anything that can be injected into another class.


@Module({
  providers: [UserService, ModuleService],
  exports: [UserService, ModuleService],
})
export class UserModule {}
Why ...knexProvider?
❌ providers: [knexProvider] → registers the array itself, not its contents.

✅ providers: [...knexProvider] → spreads the array and registers each provider correctly.

🧠 Key Learnings
Providers keep code modular & reusable.

Redis caching reduces database load and speeds up repeated queries.

Always set expiration (EX) to avoid stale or bloated cache.

Spreading providers (...) is required for proper NestJS registration.

📚 References
NestJS Docs - Providers

Redis Official Docs

Sequelize ORM

Knex.js