/***
 * Excerpted from "Modern Front-End Development for Rails, Second Edition",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit https://pragprog.com/titles/nrclient2 for more book information.
***/
describe("On a concert page", () => {
  beforeEach(function () {
    cy.request("/cypress_rails_reset_state")
    cy.request("POST", "/test/log_in_user")
    cy.visit("/concerts/last")
  })

  it("blocks tickets on edge when ticket list changes", () => {
    cy.get("[data-cy=1x10]").should("have.attr", "data-color", "white")
    cy.get("[data-cy=ticketsToBuy]").select("3")
    cy.get("[data-cy=1x10]").should("have.attr", "data-color", "yellow")
    cy.get("[data-cy=1x9]").should("have.attr", "data-color", "yellow")
    cy.get("[data-cy=1x8]").should("have.attr", "data-color", "white")
  })

  it("marks a ticket as sold on click", () => {
    cy.get("[data-cy=1x10]").click()
    cy.get("[data-cy=1x10]").should("have.attr", "data-color", "green")
    cy.get("[data-cy=1x9]").should("have.attr", "data-color", "white")
    cy.get("[data-cy=ticketsPurchased").should("have.text", "1")
    cy.get("[data-cy=ticketCost").should("have.text", "$15.00")
  })

  it("marks a group of tickets sold on click", () => {
    cy.get("[data-cy=ticketsToBuy]").select("2")
    cy.get("[data-cy=1x9]").click()
    cy.get("[data-cy=1x9]").should("have.attr", "data-color", "green")
    cy.get("[data-cy=1x10]").should("have.attr", "data-color", "green")
    cy.get("[data-cy=1x8]").should("have.attr", "data-color", "yellow")
    cy.get("[data-cy=ticketsPurchased").should("have.text", "2")
    cy.get("[data-cy=ticketCost").should("have.text", "$30.00")
  })

  it("undoes a sale on second click", () => {
    cy.get("[data-cy=1x10]").click()
    cy.get("[data-cy=1x10]").should("have.attr", "data-color", "green")
    cy.get("[data-cy=1x10]").click()
    cy.get("[data-cy=1x10]").should("have.attr", "data-color", "white")
    cy.get("[data-cy=ticketsPurchased").should("have.text", "0")
    cy.get("[data-cy=ticketCost").should("have.text", "$0.00")
  })

  it("clears from the clear ticket button", () => {
    cy.get("[data-cy=1x10]").click()
    cy.get("[data-cy=1x4]").click()
    cy.get("[data-cy=1x3]").click()
    cy.get("[data-cy=clearButton]").click()
    cy.get("[data-cy=1x10]").should("have.attr", "data-color", "white")
    cy.get("[data-cy=ticketsPurchased").should("have.text", "0")
    cy.get("[data-cy=ticketCost").should("have.text", "$0.00")
  })
})
