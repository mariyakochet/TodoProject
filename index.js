const { initDB } = require("./db");
const ToDo = require("./db/models/ToDo.model");

/**
 * Создание экземпляра Fastify
 * Fastify - библиотека, которая создает сервер, апи и другую хрень
 */
const fastify = require("fastify")({ logger: true });

/**
 * GET запрос
 * достает список всех тудушек
 */
fastify.get("/api/todos", async (req, reply) => {
  try {
    console.log("до");
    const toDoList = await ToDo.findAll();
    console.log("после");
    reply.send({ toDoList });
  } catch (error) {
    reply.send({ error: error.message });
  }
});
/**
 * GET запрос
 * достает конкретную тудушку
 */
fastify.get("/api/todos/:id", async (req, reply) => {
  try {
    const toDo = await ToDo.findByPk(req.params.id);
    if (toDo === null) {
      return { message: "not found" };
    } else {
      return { toDo };
    }
  } catch (error) {
    return { error: error.message };
  }
});
/**
 * GET запрос
 * создает тудушку
 */
fastify.post("/api/todos", async (req, reply) => {
  try {
    const toDoCreate = await ToDo.create({
      title: req.body.title,
      description: req.body.description,
      isCompleted: req.body.isCompleted,
    });
    return { toDoCreate };
  } catch (error) {
    return { error: error.message };
  }
});
/**
 * GET запрос
 * удаляет все тудушки
 */
fastify.delete("/api/todos", async (req, reply) => {
  try {
    await ToDo.destroy({
      where: {},
    });
    return { message: "All elements have been deleted." };
  } catch (error) {
    return { error: error.message };
  }
});
/**
 * GET запрос
 * удаляет конкретную тудушку
 */
fastify.delete("/api/todos/:id", async (req, reply) => {
  try {
    const toDoDelete = await ToDo.findByPk(req.params.id);
    if (toDoDelete === null) {
      return { message: "not found" };
    }
    await ToDo.destroy({
      where: {
        id: req.params.id,
      },
    });

    return { message: "The entry has been removed." };
  } catch (error) {
    return { error: error.message };
  }
});
/**
 * GET запрос
 * редактирует конкретную тудушку
 */
fastify.patch("/api/todos/:id", async (req, reply) => {
  try {
    const toDo = await ToDo.findByPk(req.params.id);
    if (toDo === null) {
      return { message: "not found" };
    }
    await toDo.update({
      title: req.body.title,
      description: req.body.description,
      isCompleted: req.body.isCompleted,
    });

    const updatedToDO = await ToDo.findByPk(req.params.id);
    return { updatedToDO };
  } catch (error) {
    return { error: error.message };
  }
});

/**
 * Запускает fastify(сервер) на конкретном(3000) порту
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3100 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

initDB();
start();



// const app = express();

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// Получить список со всеми ToDo. GET /api/todos
// Получить ToDo по id. GET /api/todos/{id}
// Создать ToDo. POST /api/todos
// Редактировать ToDo по id. PATCH /api/todos/{id}
// Удалить ToDo по id. DELETE /api/todos/{id}
// Удалить ВСЕ ToDo. DELETE /api/todos

// app.use((req, _res, next) => {
//   console.log("URL = " + req.url);
//   console.log("Original_URL = ", req.originalUrl);
//   console.log("METHOD = ", req.method);
//   console.log("HOST = ", req.headers.host);
//   console.log("IsSecure = ", req.secure);
//   console.log("BODY", req.body);
//   console.log("QUERY", req.query);

//   next();
// });

// app.get("/api/todos", async (_, res) => {
//   try {
//     const toDoList = await ToDo.findAll();
//     res.json({ toDoList });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post("/api/todos", async (req, res) => {
//   try {
//     const toDoCreate = await ToDo.create({
//       title: req.body.title,
//       description: req.body.description,
//       isCompleted: req.body.isCompleted,
//     });
//     res.json(toDoCreate);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get("/api/todos/:id", async (req, res) => {
//   try {
//     const toDo = await ToDo.findByPk(req.params.id);
//     if (toDo === null) {
//       res.status(404).json({ message: "not found" });
//     } else {
//       res.json(toDo);
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete("/api/todos", async (_, res) => {
//   try {
//     await ToDo.destroy({
//       where: {},
//     });
//     res.json({ message: "All elements have been deleted." });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete("/api/todos/:id", async (req, res) => {
//   try {
//     const toDoDelete = await ToDo.findByPk(req.params.id);
//     if (toDoDelete === null) {
//       res.status(404).json({ message: "not found" });
//       return;
//     }
//     await ToDo.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });

//     res.json({ message: "The entry has been removed." });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.patch("/api/todos/:id", async (req, res) => {
//   try {
//     const toDo = await ToDo.findByPk(req.params.id);
//     if (toDo === null) {
//       res.status(404).json({ message: "not found" });
//       return;
//     }
//     await toDo.update({
//       title: req.body.title,
//       description: req.body.description,
//       isCompleted: req.body.isCompleted,
//     });

//     const updatedToDO = await ToDo.findByPk(req.params.id);
//     res.json(updatedToDO);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
