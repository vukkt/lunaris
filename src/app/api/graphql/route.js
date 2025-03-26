import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import prisma from "../../lib/prisma";

// GraphQL Schema Definition
const typeDefs = `
  # Basic type for our dummy model
  type Dummy {
    id: Int!
  }

  # Query definitions
  type Query {
    allDummies: [Dummy!]!
  }

  # Mutation definitions
  type Mutation {
    createDummy: Dummy!
  }
`;

// Resolvers for GraphQL operations
const resolvers = {
	Query: {
		// Retrieve all Dummy records using Prisma
		allDummies: async () => await prisma.dummy.findMany(),
	},
	Mutation: {
		// Create a new Dummy record
		createDummy: async () => {
			const newDummy = await prisma.dummy.create({ data: {} });
			return newDummy;
		},
	},
};

// Create the Apollo Server instance
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

// Create the handler
const handler = startServerAndCreateNextHandler(server, {
	context: async (req, res) => ({
		prisma,
		req,
		res,
	}),
});

// Export named methods for different HTTP methods
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
