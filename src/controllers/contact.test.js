const express = require("express");
const request = require("supertest");
const { listContacts } = require("./contactsController");

const app = express();
app.get("/api/contacts", listContacts);

describe("test listContacts controller", () => {
	beforeAll(() => app.listen(3000));
	// afterAll(() => app.close());
	test("return contacts", async () => {
		const response = await request(app).get("/api/contacts/6367ee126c92453a724ad861");
		console.log(response);
		expect(response.status).toBe(200);
		//  expect(Array.isArray(response.body)).toBe(true);
		const [contact] = response.body;
		expect(response.contact.email).toBe("string");
		//  expect(typeof user.token).toBe("string");
		//  expect(typeof user.email).toBe("string");
		//  expect(typeof user.subscription).toBe("string");
	});
});
