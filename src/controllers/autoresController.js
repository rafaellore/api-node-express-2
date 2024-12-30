import NaoEncontrado from "../errors/NaoEncontrado.js";
import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await autores.find();

      res.status(200).json(autoresResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autoresResultado = await autores.findById(id);

      if (autoresResultado !== null) {
        res.status(200).send(autoresResultado);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  // trecho de código suprimido

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      const autorResultado = await autor.save();

      if (autorResultado !== null) {
        res.status(201).send(autorResultado.toJSON());
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorAtualizado = await autores.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (autorAtualizado !== null) {
        res.status(200).send({ message: "Autor atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorRemovido = await autores.findByIdAndDelete(id);

      if (autorRemovido === null) {
        next(new NaoEncontrado("Id do Autor não localizado."));
      } else {
        res.status(200).send({ message: "Autor removido com sucesso" });
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default AutorController;
