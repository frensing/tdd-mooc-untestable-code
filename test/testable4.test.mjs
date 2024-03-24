import { afterAll, beforeAll, afterEach, beforeEach, describe, test } from "vitest";
import { expect, use } from "chai";
import { PasswordService, PostgresUserDao, InMemUserDao } from "../src/testable4.mjs";
import argon2 from "@node-rs/argon2"
import pg from "pg";
import { readFileSync } from "fs";

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
    const userAfter = await users.getById(userId)
    expect(userAfter.passwordHash).to.equal(user.passwordHash)
  })
});

describe('UserDaos', () => {

  function UserDaoContract(daoProvider) {
    let userId = 1
    let dao
    beforeEach(() => {
      dao = daoProvider()
    })
    
    test('getById', async () => {
      const user1 = {
        userId: userId++,
        passwordHash: 'abc'
      }
      const user2 = {
        userId: userId++,
        passwordHash: 'def'
      }

      await dao.save(user1)
      await dao.save(user2)

      const daoUser1 = await dao.getById(user1.userId)
      const daoUser2 = await dao.getById(user2.userId)
      expect(daoUser1).to.deep.equal(user1)
      expect(daoUser1).to.not.equal(user1)
      expect(daoUser2).to.deep.equal(user2)
      expect(await dao.getById(999)).to.be.null
    })

    test('update user', async () => {
      const user = {
        userId: userId++,
        passwordHash: 'abc'
      }
      await dao.save(user)
      expect(await dao.getById(user.userId)).to.deep.equal(user)

      user.passwordHash = 'xyz'

      expect(await dao.getById(user.userId)).to.not.deep.equal(user)
      await dao.save(user)
      expect(await dao.getById(user.userId)).to.deep.equal(user)
    })
  }

  describe('InMemUserDao', () => {
    UserDaoContract(() => new InMemUserDao())
  })

  describe('PostgresUserDao', () => {
    let db
    let dao
    beforeAll(async () => {
      db = new pg.Pool({
        user: 'untestable',
        host: 'localhost',
        database: 'untestable',
        password: 'secret',
        port: 5432,
      })
      await db.query(readFileSync("./src/drop-tables.sql", { encoding: "utf8", flag: "r" }));
      await db.query(readFileSync("./src/create-tables.sql", { encoding: "utf8", flag: "r" }));
      dao = new PostgresUserDao(db)
    })

    afterAll(async () => {
      await db.end()
    })

    UserDaoContract(() => dao)
  })
})
