import NaoEncontrado from "../errors/NaoEncontrado.js";
import { livros } from "../models/index.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find().populate("autor").exec();

      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros
        .findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultados === null) {
        next(new NaoEncontrado("Id do Livro não localizado."));
      } else {
        res.status(200).send(livroResultados);
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (livroResultado === null) {
        next(new NaoEncontrado("Id do Livro não localizado."));
      } else {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroExcluido = await livros.findByIdAndDelete(id);

      if (livroExcluido === null) {
        next(new NaoEncontrado("Id do Livro não localizado."));
      } else {
        res.status(200).send({ message: "Livro removido com sucesso" });
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = processaBusca(req.query);

      const livrosResultado = await livros.find(busca);

      if (livrosResultado.length === 0) {
        next(new NaoEncontrado("Editora nao encontrada."));
      } else {
        res.status(200).send(livrosResultado);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

function processaBusca(query) {
  const { editora, titulo, minPaginas, maxPaginas } = query;

  const busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  return busca;
}
export default LivroController;
