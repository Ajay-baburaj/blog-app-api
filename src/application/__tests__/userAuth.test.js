//test using usecases

import { jest } from '@jest/globals';
import bcrypt, { hash } from 'bcrypt'
import User from '../../framework/database/mongoDb/models/userModel';




jest.mock("authserviceIns.createToken", (() => {
  createJwtToken: jest.fn(() => 'jwt_token')
}))

const mockRequest = () => {
  return {
    body: {
      name: "testUser",
      email: "testuser@gmail.com",
      password: '123456'
    }
  }
}

const mockedResponse = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  }
}

const mockUser = () => {
  return {
    _id: "64a3108ec38e55ce4aa866cc",
    name: "testUser",
    email: "testuser@gmail.com",
    password: 'hashedPassword'
  }
}

describe("Register_User", () => {
  it("should nbe registered user", async () => {
    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce("hashedPassword")
    jest.spyOn(User, 'create').mockImplementationOnce(mockUser)

    const mockReq = mockRequest();
    const mockRes = mockedResponse()
    console.log(mockReq,mockRes)
  })
})



