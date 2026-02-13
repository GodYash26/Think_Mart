import { FlaggedProductsSection } from "../products/components/flagged-products-section";

export const OfferProducts = () => {
  return (
    <FlaggedProductsSection
      title="Offer Products"
      queryParams={{ isOffer: true }}
      gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
    />
  );
}