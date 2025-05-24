import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("https://test.com/login", () => {
    return HttpResponse.json({
      success: true,
      message: "Login successful",
      data: {
        name: "John Doe",
        email: "johndoe@gmail.com",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2MTYyMzkwMjJ9.dummysignature1234567890abcdef",
      },
    });
  }),
  http.post("https://test.com/register", () => {
    return HttpResponse.json({
      success: true,
      message: "Registration successful",
    });
  }),
  http.get("https://test.com/analytics", () => {
    return HttpResponse.json({
      success: true,
      message: "Registration successful",
      data: {
        cards: {
          totalUsers: 1820,
          activeSessions: 240000,
          salesRevenue: 21480,
        },
        salesChart: [
          { name: "Jan", value: 400 },
          { name: "Feb", value: 300 },
          { name: "Mar", value: 500 },
          { name: "Apr", value: 600 },
        ],
        growthChart: [
          { name: "Q1", value: 200 },
          { name: "Q2", value: 450 },
          { name: "Q3", value: 700 },
          { name: "Q4", value: 850 },
        ],
        categoryChart: [
          { name: "Electronics", value: 400 },
          { name: "Clothing", value: 300 },
          { name: "Books", value: 300 },
        ],
        salesTable: [
          { name: "Alice Johnson", email: "alice@example.com", sales: 1200 },
          { name: "Bob Smith", email: "bob@example.com", sales: 900 },
          { name: "Carol White", email: "carol@example.com", sales: 1500 },
        ],
      },
    });
  }),
];
