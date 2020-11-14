"use strict";
const Database = use("Database");
const ProductTypes = use("App/Models/ProductType");

class ProductTypeController {
  async index({ response }) {
    try {
      const productTypes = await ProductTypes.all();
      return productTypes;
    } catch (err) {
      console.log(err);
      response.status(500).json({ error: "Falha interna, tenta novamente" });
    }
  }

  async show({ params, response }) {
    try {
      const productType = await ProductTypes.query().where("id", params.id);
      return productType;
    } catch (err) {
      console.log(err);
      response.status(500).json({ error: "Falha interna, tenta novamente" });
    }
  }
  async store({ request, response }) {
    const trx = await Database.beginTransaction();
    try {
      const data = request.all();
      const productType = new ProductTypes();
      productType.merge(data);
      await productType.save(trx);
      await trx.commit();
      return response.status(200).json(productType);
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ error: "Falha ao realizar a operação. Tente novamente." });
    }
  }
  async update({ params, response }) {
    try {
      const productType = await ProductTypes.findOrFail(params.id);
      const data = request.all();
      productType.merge(data);
      await productType.save();
      return response.status(200).json(productType);
    } catch (err) {
      console.log(err);
      response.status(500).json({ error: "Falha interna, tenta novamente" });
    }
  }
  async destroy({ params, response }) {
    try {
      const productType = await ProductTypes.findOrFail(params.id);

      await productType.delete();
      return response.status(200).json({ success: "Deletado com sucesso" });
    } catch (err) {
      console.log(err);
      response.status(500).json({ error: "Falha interna, tenta novamente" });
    }
  }
}

module.exports = ProductTypeController;
