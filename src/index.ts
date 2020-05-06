import knex from "knex";
import dotenv from "dotenv";
dotenv.config();

const connection = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
  },
});

// const createProduct = async (
//   id: string,
//   name: string,
//   price: number
// ): Promise<void> => {
//   await connection.raw(`
//     INSERT INTO Product (id, name)
//     VALUES (
//       "${id}",
//       "${name}",
//       ${price}
//     )
//   `);
//   console.log("Produto criado com o id: ", id);
// };

// const getProductById = async (id: string): Promise<any> => {
//   const result = await connection.raw(`
//     SELECT * FROM Product WHERE id = ${id}
//   `);

//   return result[0];
// };

const createProduct = async (
  id: string,
  name: string,
  price: number
): Promise<void> => {
  await connection
    .insert({
      id: id,
      name: name,
      price: price,
    })
    .into("Product");

  console.log("Produto criado com o id: ", id);
};

const getProductById = async (id: string): Promise<any> => {
  const result = await connection.select("*").from("Product");

  return result;
};

const updateProductPrice = async (id: string, price: number): Promise<void> => {
  await connection("Product")
    .update({
      price: price,
    })
    .where({ id });
  console.log("Atualizado com sucesso");
};

const getProductsAvg = async (): Promise<any> => {
  const result = await connection("Product").avg("price as average");
  return result[0];
};

async function main(): Promise<void> {
  try {
    const result = await getProductsAvg();
    console.log(result);
    console.log(result.average);
  } catch (err) {
    console.log(err);
  }
}

main();
