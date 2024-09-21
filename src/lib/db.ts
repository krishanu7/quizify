import { Pool } from '@neondatabase/serverless';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

// Use the DATABASE_URL environment variable to create the connection string
const connectionString = process.env.DATABASE_URL || '';

// Create a connection pool using Neon DB's Pool and the connection string
const pool = new Pool({ connectionString });

// Initialize the Prisma client
declare global {
    var cachedPrisma: PrismaClient;
}

export let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient();
    }
    prisma = global.cachedPrisma;
}
