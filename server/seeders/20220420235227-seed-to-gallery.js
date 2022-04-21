'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        imageUrl: "https://www.celebes.co/borneo/wp-content/uploads/2020/11/Mengenal-Pulau-Derawan.jpg",
        captions: "Derawan Island - Holiday vibe",
        location: "Pulau Derawan, Berau, East-Borneo",
        customerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: "https://phinemo.com/wp-content/uploads/2017/12/31103764050_806df6d841_o.jpg",
        captions: "Vitamin-sea",
        location: "Pulau Maratua, Berau, East-Borneo",
        customerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: "https://correcto.id/content/images/th1_2020060202270690546.jpg",
        captions: "Capek, pengen jadi ikan aja deh",
        location: "Labuan Cermin, Berau, East-Borneo",
        customerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        imageUrl: "https://cdn.idenesia.co/pojoknegeri/media/images/2021/12/mide_FA8DVH1Y_kaniungan.jpg",
        captions: "Nonton sunset sama ayang",
        location: "Pulau Kaniungan, Berau, East-Borneo",
        customerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    await queryInterface.bulkInsert('Galleries', data, {})
  },

  async down(queryInterface, Sequelize) {
    elete('People', null, {});
    await queryInterface.bulkDelete('Galleries', null, {});
  }
};
