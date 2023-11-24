import { Movie, Rental } from "@prisma/client";
import { notFoundError } from "errors/notfound-error";
import { RentalInput } from "protocols";
import rentalsRepository from "repositories/rentals-repository";
import rentalsService from "services/rentals-service";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Rentals Service Unit Tests, Get Rentals", () => {
  it("should return all rentals", async () => {
    jest
      .spyOn(rentalsRepository, "getRentals")
      .mockImplementationOnce((): any => {
        return [
          {
            id: 1,
            closed: false,
            date: new Date(),
            endDate: new Date(),
            userId: 1,
          },
          {
            id: 2,
            closed: false,
            date: new Date(),
            endDate: new Date(),
            userId: 1,
          },
        ];
      });

    const rentals = await rentalsService.getRentals();

    expect(rentals).toHaveLength(2);
  });

  it("should return a specific rental", async () => {
    const rentalmocked: Rental & { movies: Movie[] } = {
      id: 1,
      closed: false,
      date: new Date(),
      endDate: new Date(),
      userId: 1,
      movies: [{ id: 1, name: "Harry Potter", adultsOnly: true, rentalId: 1 }],
    };
    jest
      .spyOn(rentalsRepository, "getRentalById")
      .mockResolvedValueOnce(rentalmocked);
    const rental = await rentalsService.getRentalById(1);
    expect(rental).toEqual(rentalmocked);
  });

  it("should return 'not found error' when there is no rental", async () => {
   jest
   .spyOn(rentalsRepository, "getRentalById")
   .mockResolvedValue(null)

   const rental = rentalsService.getRentalById(1)
   expect(rental).rejects.toEqual(notFoundError("Rental not found."))
  })
});

// describe("Rentals Service Unit Tests, Create Rentals", () => {
//   it("should create a rental", async () => {
//     const rentalInput: RentalInput = {
//       userId: 1,
//       moviesId: [1]
//     }
//     jest
//     .spyOn(rentalsRepository, "createRental")
//     .mockResolvedValueOnce()
//   })
// })