import axios from "axios";

export default class PostService {
  static async getAll(per_page = 10, page = 1) {
    const response = await axios.get(
      "http://localhost:8000/car",
      {
        params: {
          page: page,
          per_page: per_page,
        },
      }
    );
    console.log(response);
    return response;
  }

  static async getById(id) {
    const response = await axios.get(
      `http://localhost:8000/car/${id}`
    );
    return response;
  }

  static async deleteById(id) {
    const response = await axios.delete(
      `http://localhost:8000/car/${id}`
    );
  }

  static async update(id, model, owner, mileage) {
    const response = await axios.put(
        `http://localhost:8000/car`,
        {
          'id': id,
          'model': model === "" ? null : model,
          'owner': owner === "" ? null : owner,
          'mileage': mileage
        }
    )
  }

    static async create(id, model, owner, mileage) {
        const response = await axios.post(
            `http://localhost:8000/car`,
            {
                'id': id,
                'model': model,
                'owner': owner,
                'mileage': mileage
            }
        )
    }
}
