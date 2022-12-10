import PropTypes from 'prop-types';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getProduct } from '../services/api';
import './css/Product.css';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      email: '',
      mensagem: '',
      evaluation: [],
      nota: '0',
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
    const { match } = this.props;
    const { id } = match.params;
    const prevEvaluation = JSON.parse(localStorage.getItem('avaliacoes'));
    const saveEvaluation = {
      email,
      mensagem,
      nota,
      id_comment: prevEvaluation !== null ? prevEvaluation.length : 0,
      id_product: id,
    };
    let trueEvalution;
    if (prevEvaluation !== null) {
      trueEvalution = [...prevEvaluation, saveEvaluation];
      localStorage
        .setItem('avaliacoes', JSON.stringify(trueEvalution));
    } else {
      trueEvalution = [saveEvaluation];
      localStorage.setItem('avaliacoes', JSON.stringify(trueEvalution));
    }

    this.setState({
      evaluation: trueEvalution,
      email: '',
      mensagem: '',
      nota: '0',
    });

    document.querySelectorAll('.star-content')
      .forEach((element) => { element.style.color = 'black'; });
  }

  clickEvaluations = () => {
    const assessments = JSON.parse(localStorage.getItem('avaliacoes'));
    if (assessments !== null) {
      console.log(assessments);
      this.setState({
        evaluation: assessments,
      });
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
        shipping: product.shipping.free_shipping,
        coin: product.currency_id,
      },
    ];
    console.log(data);
    const produto = JSON.parse(localStorage.getItem('carrinho'));
    if (produto === null) {
      return this.setLocalStorage([...data]);
    }
    this.setLocalStorage([...produto, ...data]);
  }

  handleStarColor = ({ target }) => {
    const rating = target.parentNode.parentNode;
    if (rating.style.color === 'orange') {
      const mgnum = 5;
      for (let index = mgnum; index > rating.id; index -= 1) {
        const item = document.getElementById(index);
        item.style.color = 'black';
      }
    } else {
      for (let index = 1; index <= rating.id; index += 1) {
        const item = document.getElementById(index);
        item.style.color = 'orange';
      }
    }

    this.setState({ nota: rating.id });
  }

  render() {
    const { match } = this.props;
    const { id } = match.params;
    const { product, loading, email, mensagem, evaluation } = this.state;

    console.log(evaluation);
    return (
      <>
        <Header />
        <div className="product">
          {
            loading ? <Loading /> : (
              <main className="main-container">
                <section className="product-data">
                  <div className="image-container">
                    <img src={ product.pictures[0].url } alt={ product.title } />
                  </div>
                  <div className="data-container">
                    <h3 data-testid="product-detail-name">{product.title}</h3>
                    <p>{`${product.price}${product.currency_id}`}</p>
                    <div className="btn-cart">
                      <button
                        className="cart-btn"
                        data-testid="product-detail-add-to-cart"
                        type="button"
                        onClick={ this.handleClick }
                      >
                        Adicionar ao carrinho
                      </button>
                    </div>
                  </div>
                </section>

                <section className="comments-area">
                  <input
                    className="comment-email"
                    data-testid="product-detail-email"
                    name="email"
                    onChange={ this.handleChange }
                    placeholder="E-mail"
                    type="email"
                    value={ email }
                  />
                  <div className="stars">
                    <div className="star-content" id="1">
                      <FaStar onClick={ this.handleStarColor } />
                    </div>
                    <div className="star-content" id="2">
                      <FaStar onClick={ this.handleStarColor } />
                    </div>
                    <div className="star-content" id="3">
                      <FaStar onClick={ this.handleStarColor } />
                    </div>
                    <div className="star-content" id="4">
                      <FaStar onClick={ this.handleStarColor } />
                    </div>
                    <div className="star-content" id="5">
                      <FaStar onClick={ this.handleStarColor } />
                    </div>
                  </div>
                  <textarea
                    className="comment-text"
                    data-testid="product-detail-evaluation"
                    name="mensagem"
                    onChange={ this.handleChange }
                    type="text"
                    value={ mensagem }
                  />
                  <button
                    className="comment-btn"
                    data-testid="submit-review-btn"
                    onClick={ this.handleSaveEvaluation }
                    type="submit"
                  >
                    Submit
                  </button>
                </section>
                <section className="comments-container">
                  {
                    evaluation ? evaluation
                      .filter((element) => element.id_product === id)
                      .sort((a, b) => b.id_comment - a.id_comment)
                      .map((avaliacao) => (
                        <div key={ avaliacao.email } className="comment-item">
                          <div className="comement-email">
                            <p>{avaliacao.email}</p>
                            <p className="comment-star">
                              {avaliacao.nota}
                              <span className="star"><FaStar /></span>
                            </p>
                          </div>
                          <p>{avaliacao.mensagem}</p>
                        </div>
                      )) : <div> Sem Comentarios</div>
                  }
                </section>
              </main>
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
