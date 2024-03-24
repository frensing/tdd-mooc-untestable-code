import { afterEach, beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { PasswordService, PostgresUserDao, InMemUserDao } from "../src/testable4.mjs";
import argon2 from "@node-rs/argon2"

describe("Password Service", () => {
  let service;
  let users;
  beforeEach(() => {
    users = new InMemUserDao()
    service = new PasswordService(users);
  });

  test("change password", async () => {
    const userId = 1
    const user = {
      userId,
      passwordHash: argon2.hashSync('old')
    }
    await users.save(user)

    await service.changePassword(userId, 'old', 'new')

    const changedUser = await users.getById(userId)
    expect(changedUser.passwordHash).to.not.equal(user.passwordHash)
    expect(argon2.verifySync(changedUser.passwordHash, 'new')).to.be.true
  });

  test('wrong old password', async () => {
    const userId = 1
    const user = {
      userId,
      passwordHash: argon2.hashSync('old')
    }
    await users.save(user)

    let error;
    try {
      await service.changePassword(userId, 'wrong', 'new')
    } catch (e) {
      error = e
    }
    expect(error).to.deep.equal(new Error('wrong old password'))
  })
});

describe('PostgresUserDao', () => {


  afterEach(() => {
    PostgresUserDao.getInstance().close();
  });

  test('todo', () => {

  })
})
