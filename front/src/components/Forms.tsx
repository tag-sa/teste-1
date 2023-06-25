import React, { useState } from "react";
import axios from "axios";
import "./scss/forms.scss";
import Modal from "./Modal";

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface CategoryData {
  name: string;
}

interface ProductData {
  name: string;
  status: string;
  categoryId: number;
  userId: any;
  image: any;
}

interface UsersFormProps {
  handleCadastro: (data: UserData, token: string | null) => void;
}

interface CategoriesFormProps {
  handleCadastro: (data: CategoryData, token: string | null) => void;
}

interface ProductsFormProps {
  handleCadastro: (data: ProductData, token: string | null) => void;
}
const UsersForm: React.FC<UsersFormProps> = ({ handleCadastro }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const userData: UserData = {
      name,
      email,
      password,
    };

    const token = localStorage.getItem("token");
    handleCadastro(userData, token);

    // Limpar os campos do formulário após o cadastro ser concluído
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <h2 className="txt-topo">Cadastro de Usuários</h2>
      <form className="form">
        <label className="txt-forms" htmlFor="name">
          Nome:
        </label>
        <div className="form-item">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <label className="txt-forms" htmlFor="email">
          Email:
        </label>
        <div className="form-item">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <label className="txt-forms" htmlFor="password">
          Senha:
        </label>
        <div className="form-item">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSubmit}>
          Cadastrar Usuário
        </button>
      </form>
    </>
  );
};

const CategoriesForm: React.FC<CategoriesFormProps> = ({ handleCadastro }) => {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    const categoryData: CategoryData = {
      name,
    };

    const token = localStorage.getItem("token");
    handleCadastro(categoryData, token);

    // Limpar os campos do formulário após o cadastro ser concluído
    setName("");
  };

  return (
    <>
      <h2>Cadastro de Categorias</h2>
      <form className="form">
        <label className="txt-forms" htmlFor="categoryName">
          Nome da Categoria:
        </label>
        <div className="form-item">
          <input
            type="text"
            id="categoryName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSubmit}>
          Cadastrar Categoria
        </button>
      </form>
    </>
  );
};

const ProductsForm: React.FC<ProductsFormProps> = ({ handleCadastro }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [image, setImage] = useState<File | null>(null); // Novo estado para a imagem
  const [imageName, setImageName] = useState(""); // Estado para o nome da imagem

  const handleSubmit = async () => {
    const productData: ProductData = {
      name,
      status,
      categoryId,
      userId: localStorage.getItem("userId") || "",
      image: imageName, // Enviar apenas o nome da imagem
    };

    const token = localStorage.getItem("token");

    if (token) {
      handleCadastro(productData, token);
    }

    setName("");
    setStatus("");
    setCategoryId(0);
    setImage(null); // Limpando o estado da imagem
    setImageName(""); // Limpando o estado do nome da imagem
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedImage = event.target.files[0];
      const imageName = selectedImage.name;
      setImage(selectedImage);
      setImageName(imageName);
    }
  };

  return (
    <>
      <h2>Cadastro de Produtos</h2>
      <form className="form">
        <label className="txt-forms" htmlFor="productName">
          Nome do Produto:
        </label>
        <div className="form-item">
          <input
            type="text"
            id="productName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <label className="txt-forms" htmlFor="productStatus">
          Status do Produto:
        </label>
        <div className="form-item">
          <input
            type="text"
            id="productStatus"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <label className="txt-forms" htmlFor="categoryId">
          ID da Categoria:
        </label>
        <div className="form-item">
          <input
            type="number"
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          />
        </div>
        <label className="txt-forms" htmlFor="productImage">
          Imagem do Produto:
        </label>
        <div className="form-item">
          <input type="file" id="productImage" onChange={handleImageChange} />
        </div>

        <button type="button" onClick={handleSubmit}>
          Cadastrar Produto
        </button>
      </form>
    </>
  );
};

const FormsComponent = () => {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const handleCadastroUsuario = async (
    userData: UserData,
    token: string | null
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/users",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // Faça algo com a resposta do servidor
    } catch (error) {
      console.error(error); // Trate o erro conforme necessário
      setIsErrorModalOpen(true); // Abre o modal de erro
    }
  };

  const handleCadastroCategoria = async (
    categoryData: CategoryData,
    token: string | null
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/categories",
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // Faça algo com a resposta do servidor
    } catch (error) {
      console.error(error); // Trate o erro conforme necessário
      setIsErrorModalOpen(true); // Abre o modal de erro
    }
  };

  const handleCadastroProduto = async (
    data: ProductData,
    token: string | null
  ): Promise<void> => {
    if (token === null) {
      // Trate o caso em que o token é nulo
      return;
    }

    const productData: ProductData = {
      ...data,
      userId: localStorage.getItem("userId") || "",
    };

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("status", productData.status);
    formData.append("categoryId", productData.categoryId.toString());
    formData.append("userId", productData.userId);
    formData.append("image", productData.image);

    try {
      const response = await axios.post(
        "http://localhost:3001/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data); // Faça algo com a resposta do servidor
    } catch (error) {
      console.error(error); // Trate o erro conforme necessário
      setIsErrorModalOpen(true); // Abre o modal de erro
    }
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div className="container">
      <UsersForm handleCadastro={handleCadastroUsuario} />
      <CategoriesForm handleCadastro={handleCadastroCategoria} />
      <ProductsForm handleCadastro={handleCadastroProduto} />
      <Modal isOpen={isErrorModalOpen} onRequestClose={handleCloseErrorModal}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Erro</h2>
            <button
              className="modal-close"
              onClick={handleCloseErrorModal}
            ></button>
          </div>
          <div className="modal-body">
            <p>Ocorreu um erro ao realizar a requisição.</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FormsComponent;
