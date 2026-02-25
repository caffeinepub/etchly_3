import Array "mo:core/Array";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  type OrderStatus = { #designing; #etching; #shipped };

  type Material = {
    title : Text;
    priceUSD : Float;
    imageKey : Text;
  };

  type Product = {
    id : Text;
    name : Text;
    materials : [Material];
    description : Text;
  };

  type Order = {
    id : Text;
    status : OrderStatus;
    createdAt : Time.Time;
  };

  let productMap = Map.fromIter<Text, Product>(
    [
      (
        "product1",
        {
          id = "product1";
          name = "Custom Cutting Board";
          materials = [
            {
              title = "Walnut";
              priceUSD = 59.99;
              imageKey = "walnut_image";
            },
            {
              title = "Hard Maple";
              priceUSD = 49.99;
              imageKey = "maple_image";
            },
          ];
          description = "Handcrafted cutting board with personalized etching.";
        },
      ),
      (
        "product2",
        {
          id = "product2";
          name = "Engraved Whiskey Glass Set";
          materials = [
            {
              title = "Lowball Glass";
              priceUSD = 39.99;
              imageKey = "lowball_image";
            },
            {
              title = "Highball Glass";
              priceUSD = 44.99;
              imageKey = "highball_image";
            },
          ];
          description = "Set of 4 custom-etched whiskey glasses.";
        },
      ),
      (
        "product3",
        {
          id = "product3";
          name = "Personalized Cheese Board";
          materials = [
            {
              title = "Bamboo";
              priceUSD = 34.99;
              imageKey = "bamboo_image";
            },
            {
              title = "Marble";
              priceUSD = 59.99;
              imageKey = "marble_image";
            },
          ];
          description = "Elegant cheese board perfect for entertaining.";
        },
      ),
      (
        "product4",
        {
          id = "product4";
          name = "Custom Coaster Set";
          materials = [
            {
              title = "Slate";
              priceUSD = 24.99;
              imageKey = "slate_image";
            },
            {
              title = "Cork";
              priceUSD = 19.99;
              imageKey = "cork_image";
            },
          ];
          description = "Set of 6 personalized coasters.";
        },
      ),
    ].values(),
  );

  let orderMap = Map.fromIter<Text, Order>(
    [
      (
        "order12345",
        {
          id = "order12345";
          status = #designing;
          createdAt = Time.now() - 7 * 24 * 3600 * 1000_000_000;
        },
      ),
      (
        "order67890",
        {
          id = "order67890";
          status = #etching;
          createdAt = Time.now() - 3 * 24 * 3600 * 1000_000_000;
        },
      ),
      (
        "order54321",
        {
          id = "order54321";
          status = #shipped;
          createdAt = Time.now() - 1 * 24 * 3600 * 1000_000_000;
        },
      ),
    ].values(),
  );

  public query ({ caller }) func getProducts() : async [Product] {
    productMap.values().toArray();
  };

  public query ({ caller }) func getOrderStatus(orderId : Text) : async OrderStatus {
    switch (orderMap.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?(order)) { order.status };
    };
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    orderMap.values().toArray();
  };

  public query ({ caller }) func getOrderDetails(orderId : Text) : async Order {
    switch (orderMap.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?(order)) { order };
    };
  };

  public query ({ caller }) func getProductById(productId : Text) : async Product {
    switch (productMap.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?(product)) { product };
    };
  };
};
