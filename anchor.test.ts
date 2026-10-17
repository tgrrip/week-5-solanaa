const counterKp = pg.web3.Keypair.generate();

const tx1 = await pg.program.methods
  .initialize()
  .accounts({
    counter: counterKp.publicKey,
    user: pg.wallet.publicKey,
    systemProgram: web3.SystemProgram.programId,
  })
  .signers([counterKp])
  .rpc();

console.log("Инициализация прошла, tx:", tx1);

const tx2 = await pg.program.methods
  .increment()
  .accounts({
    counter: counterKp.publicKey,
  })
  .rpc();

console.log("Инкремент выполнен, tx:", tx2);

const counterAccount = await pg.program.account.counterData.fetch(
  counterKp.publicKey
);
console.log("Текущий count в блокчейне:", counterAccount.count.toString());
