'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Projects', [
      {
        title: "ada paa",
        content: "yes i do",
        image: "images/a.jpg",
        duration: "1 bulan",
        nodejs: true,
        reactjs: true,
        js: true,
        vuejs: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "ada paa",
        content: "apa kabar",
        image: "images/a.jpg",
        duration: "1 bulan",
        nodejs: true,
        reactjs: false,
        js: true,
        vuejs: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};