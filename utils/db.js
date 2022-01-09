import { PrismaClient } from "@prisma/client";

const getCourses = async () => {
  const prisma = new PrismaClient();
  const courses = await prisma.course.findMany({
    include: {
      lessons: true,
    },
  });
  await prisma.$disconnect();
  return courses;
};

const getCourseBySlug = async (slug) => {
  const prisma = new PrismaClient();
  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
    include: {
      lessons: true,
    },
  });
  await prisma.$disconnect();
  return course;
};

const getCourse = async (id) => {
  const prisma = new PrismaClient();
  const course = prisma.course.findUnique({
    where: {
      id,
    },
  });
  await prisma.$disconnect();
  return course;
};

const getUserByEmail = async (email) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },

    // include: {
    //   courses: true,
    // },
  });
  await prisma.$disconnect();
  return user;
};

const getUserId = async (email) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },

    // include: {
    //   courses: true,
    // },
  });
  await prisma.$disconnect();
  return user;
};

const getLessons = async () => {
  const prisma = new PrismaClient();
  const lessons = await prisma.lesson.findMany();
  await prisma.$disconnect();
  return lessons;
};

const getLessonBySlug = async (slug) => {
  const prisma = new PrismaClient();
  const lesson = await prisma.lesson.findUnique({
    where: {
      slug,
    },
    include: {
      course: true,
    },
  });
  await prisma.$disconnect();
  return lesson;
};

const createUser = async (userFound) => {
  const prisma = new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
    ],
  });

  if (userFound.email_verified) {
    const user = await prisma.users.create({
      data: {
        email: userFound.email,
        name: userFound.name,
        email_verified: userFound.updated_at,
      },
    });
    await prisma.$disconnect();
    return user;
  } else {
    return json("login successfully");
  }
};

const getState = async (state) => {
  const prisma = new PrismaClient();
  const listState = await prisma.state.findMany({
    where: {
      counrty_id: state,
    },
  });
  await prisma.$disconnect();
  return lesson;
};

const getLocal = async (state) => {
  const prisma = new PrismaClient();
  const listlg = await prisma.lg.findMany({
    where: {
      state_id: state,
    },
  });
  await prisma.$disconnect();
  return lesson;
};
export {
  getCourses,
  getCourseBySlug,
  getCourse,
  getLessons,
  getLessonBySlug,
  createUser,
  getUserByEmail,
  getState,
  getLocal,
};
