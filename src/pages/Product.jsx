import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getProduct } from '../services/api';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      email: '',
      mensagem: '',
      evaluation: [],
      nota: '',
    };
  }

  componentDidMount() {
    this.fetchProduct();
    this.clickEvaluations();
  }

  fetchProduct = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const product = await getProduct(id);
    this.setState({ product, loading: false });
  }

  setLocalStorage = (item) => {
    localStorage.setItem('carrinho', JSON.stringify(item));
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSaveEvaluation = () => {
    const { email, mensagem, nota } = this.state;
    const saveEvaluation = { email, mensagem, nota };
    localStorage.setItem('avaliacoes', JSON.stringify(saveEvaluation));
    this.setState({
      evaluation: [saveEvaluation],
      email: '',
      mensagem: '',
      nota: '',
    });
  }

  clickEvaluations = () => {
    // const { evaluation } = this.state;
    const assessments = JSON.parse(localStorage.getItem('avaliacoes'));
    if (assessments !== null) {
      this.setState((state) => ({
        evaluation: [...state.evaluation, assessments],
      }));
    }
  }

  handleClick = () => {
    const { product } = this.state;
    const data = [
      {
        name: product.title,
        img: product.thumbnail,
        price: product.price,
        id: product.id,
        amount: 1,
        stock: product.available_quantity,
      },
    ];
    const produto = JSON.parse(localStorage.getItem('carrinho'));
    this.setLocalStorage([...produto, ...data]);
  }

  render() {
    const { product, loading, email, mensagem, evaluation } = this.state;
    // console.log(nota);
    const numb3 = 3;
    const numb4 = 4;
    const numb5 = 5;
    const nota = [1, 2, numb3, numb4, numb5];
    return (
      <>
        <Header />
        <div className="product">
          {
            loading ? <Loading /> : (
              <>
                <section className="product-data">
                  <h1 data-testid="product-detail-name">{product.title}</h1>
                  <img src={ product.thumbnail } alt={ product.title } />
                  <p>{`RS$ ${product.price}`}</p>
                </section>
                <div className="add-to-cart">
                  <button
                    type="button"
                    data-testid="product-detail-add-to-cart"
                    onClick={ this.handleClick }
                  >
                    Adicionar ao carrinho
                  </button>
                  <label htmlFor="email-detail">
                    <section>
                      <input
                        onChange={ this.handleChange }
                        name="email"
                        type="email"
                        data-testid="product-detail-email"
                        value={ email }
                      />
                      <br />
                      {nota.map((element) => (
                        <label htmlFor={ element } key={ element }>
                          rating:
                          {element}
                          <input
                            data-testid={ `${element}-rating` }
                            type="radio"
                            id={ element }
                            name="nota"
                            value={ element }
                            onChange={ this.handleChange }
                          />
                        </label>
                      ))}

                      <br />
                      <textarea
                        type="text"
                        data-testid="product-detail-evaluation"
                        name="mensagem"
                        value={ mensagem }
                        onChange={ this.handleChange }
                      />
                      <button
                        type="submit"
                        data-testid="submit-review-btn"
                        onClick={ this.handleSaveEvaluation }
                      >
                        Submit
                      </button>
                      { evaluation ? evaluation.map((avaliacao) => (

                        <div key={ avaliacao.email }>
                          <p>{avaliacao.email}</p>
                          <p>{avaliacao.nota}</p>
                          <p>{avaliacao.mensagem}</p>
                        </div>
                      )) : <div> Sem Comentarios</div>}

                    </section>
                  </label>
                </div>
              </>
            )
          }
        </div>
      </>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }).isRequired,
};

export default Product;
