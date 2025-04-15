import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import prisma from "../../lib/prisma";

// Define your GraphQL schema as a plain string
const typeDefs = `
  scalar DateTime

  enum UserRole {
    USER
    ADMIN
  }

  type User {
    id: Int!
    email: String!
    name: String
    role: UserRole!
    createdAt: DateTime!
    updatedAt: DateTime!
    isActive: Boolean!
    lastLogin: DateTime
    passwordResetToken: String
    resetTokenExpiresAt: DateTime
  }

  type Dummy {
    id: Int!
  }

  type Query {
    users: [User!]!
    allDummies: [Dummy!]!
  }

  type Mutation {
    createUser(email: String!, password: String!, name: String): User!
    createDummy: Dummy!
  }
`;

// Define your resolvers for GraphQL operations
const resolvers = {
	Query: {
		users: async () => await prisma.user.findMany(),
		allDummies: async () => await prisma.dummy.findMany(),
	},
	Mutation: {
		createUser: async (_parent, args) => {
			// IMPORTANT: In production, hash the password before storing!
			return await prisma.user.create({
				data: {
					email: args.email,
					password: args.password,
					name: args.name,
				},
			});
		},
		createDummy: async () => {
			return await prisma.dummy.create({ data: {} });
		},
	},
};

// Create the Apollo Server instance
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

// Create the Next.js API handler for Apollo Server
const handler = startServerAndCreateNextHandler(server, {
	context: async (req, res) => ({
		prisma,
		req,
		res,
	}),
});

// Export HTTP method handlers for Next.js API route
export async function GET(request) {
	return handler(request);
}

export async function POST(request) {
	return handler(request);
}

export async function OPTIONS(request) {
	return new Response(null, {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	});
}
