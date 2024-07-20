import React, { useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProductsContext } from "context/product_context";
import { FaSearch } from "react-icons/fa";
import { formatPrice } from "helpers/helpers";

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const ModalContent = tw.div`bg-white p-8 rounded-lg text-center`;
const QuantityControl = tw.div`flex items-center justify-center space-x-4 mb-4`;
const QuantityButton = tw(PrimaryButtonBase)`text-lg font-bold`;
const QuantityDisplay = tw.div`text-lg font-bold`;

const ModalContainer = tw.div`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50`;

const CancelButton = tw(
  PrimaryButtonBase
)`text-sm mt-4 bg-red-600 hocus:bg-red-700 ml-5`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${(props) => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;

const BuyNowButton = styled(PrimaryButtonBase)`
  ${tw`text-sm cursor-pointer`}
  ${(props) => props.disabled && tw`cursor-not-allowed bg-gray-400`}
`;

const TabContent = tw(
  motion.div
)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12  `;
const Card = tw(
  motion.a
)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0 relative`;

const CardButton = tw(
  PrimaryButtonBase
)`text-sm cursor-pointer absolute bottom-0 left-0 right-0 mx-auto`;
const CardImageContainer = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.image}");
    `}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t transition-transform transform-gpu`}
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

  &:hover {
    opacity: 0.5;

    .search-icon {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  .search-icon {
    ${tw`absolute text-white opacity-0 transition-opacity`}
    font-size: 2rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

export default ({ heading = "Checkout the Menu" }) => {
  const { products, getProductById } = useProductsContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColorIndex, setSelectedColorIndex] = useState(null); // Added state for selected color index
  const [tabsKeys, setTabsKeys] = useState([
    "Best Sellers",
    "Kaos", // Ganti sesuai category products
    "Sepatu", // Ganti sesuai category products
    "Baju", // Ganti sesuai category products
  ]);
  const [activeTab, setActiveTab] = useState("Best Sellers");
  const { addItem, updateItemQuantity, items } = useCart();
  // TODO
  // 1. Panggil state products dari product context dan tampilkan di halaman ini
  const tabs = {
    "Best Sellers": products
      .sort((a, b) => b.stars - a.stars) // Sort by stars in descending order
      .slice(0, 8), // Get the top 8 items
    Kaos: products.filter((product) => product.category.name === "Celana"),
    Sepatu: products.filter((product) => product.category.name === "Sepatu"),
    Baju: products.filter((product) => product.category.name === "Baju"),
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleCancel = () => {
    setQuantity(1);
    setSelectedColorIndex(null); // Reset selected color index when canceling
    closeModal();
  };

  const handleColorSelection = (colorIndex) => {
    // Modified to accept color index
    setSelectedColorIndex(colorIndex);
  };

  const handleBuyNow = () => {
    

    if (selectedColorIndex === null) {
      toast.error("Pilih warna terlebih dahulu", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }
    if (selectedItem && selectedColorIndex !== null) {
      // Check if color is selected
      const selectedColor = selectedItem.colors[selectedColorIndex];
      const quantityNumber = Number(quantity);

      // Buat validasi jika stock sudah habis

      if (items[selectedItem.name]) {
        updateItemQuantity(
          selectedItem.id,
          Number(items[selectedItem.name].quantity) + quantityNumber
        );
      } else {
        addItem(
          {
            ...selectedItem,
            color: selectedColor, // Add selected color to the item
          },
          quantityNumber
        );
      }

      setQuantity(1);
      setSelectedColorIndex(null); // Reset selected color index after adding to cart
      closeModal();

      toast.success(
        `Added ${quantityNumber} ${selectedItem.name}(s) to the cart`,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header>{heading}</Header>
          <TabsControl>
            {Object.keys(tabs).map((tabName, index) => (
              <TabControl
                key={index}
                active={activeTab === tabName}
                onClick={() => setActiveTab(tabName)}
              >
                {tabName}
              </TabControl>
            ))}
          </TabsControl>
        </HeaderRow>

        {tabsKeys.map((tabKey, index) => (
          <TabContent
            key={index}
            variants={{
              current: {
                opacity: 1,
                scale: 1,
                display: "flex",
              },
              hidden: {
                opacity: 0,
                scale: 0.8,
                display: "none",
              },
            }}
            transition={{ duration: 0.4 }}
            initial={activeTab === tabKey ? "current" : "hidden"}
            animate={activeTab === tabKey ? "current" : "hidden"}
          >
            {tabs[tabKey].map((card, index) => (
              <CardContainer key={index}>
                <Card
                  className="group"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <Link to={`/detail-product/${card.id}`} className="card-link">
                    <CardImageContainer
                      image={`http://localhost:8000/uploads/${card.images[0]}`}
                      className="flex items-center justify-center"
                      onClick={() => getProductById(card.id)}
                    />
                    <FaSearch className="search-icon" />
                  </Link>
                  <div>
                    <CardButton onClick={() => openModal(card)}>
                      Buy Now
                    </CardButton>
                  </div>
                </Card>
                <div className="flex justify-between">
                  <span>{card.title}</span>
                  <p>{formatPrice(card.price)}</p>
                </div>
              </CardContainer>
            ))}
          </TabContent>
        ))}
      </ContentWithPaddingXl>

      {showModal && (
        <>
          <ModalContainer>
            <ModalContent>
              <h2 tw="text-2xl font-semibold mb-4">
                Select Quantity and Color for {selectedItem.name}
              </h2>
              <QuantityControl>
                <QuantityButton
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </QuantityButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityButton
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                >
                  +
                </QuantityButton>
              </QuantityControl>
              <div tw="flex items-center mt-4">
                <p tw="text-lg font-semibold mr-2">Color:</p>
                <div tw="flex space-x-2">
                  {selectedItem.colors.map((color, index) => (
                    <div
                      key={index}
                      tw="w-8 h-8 rounded-full cursor-pointer border border-gray-300 flex items-center justify-center"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelection(index)}
                    >
                      {selectedColorIndex === index && ( // Add checkmark if color is selected
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <BuyNowButton onClick={handleBuyNow}>Add to Cart</BuyNowButton>
              <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            </ModalContent>
          </ModalContainer>
        </>
      )}
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};
