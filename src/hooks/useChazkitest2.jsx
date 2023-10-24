import axios from "axios";
import { useEffect, useState } from "react";

export default function useChaski(trackCode) {
  const [link, setLink] = useState("");

  useEffect(() => {
    if (!trackCode) {
      // Si no hay un trackCode, resetea el estado link.
      setLink("");
    } else {
      axios
        .post("https://backend.chazki.com", {
          operationName: "getOrderPublicTrackCode",
          variables: {
            trackCode,
          },
          query:
            "query getOrderPublicTrackCode($trackCode: String!) {\n  OrderPublicTrackCode: getOrderPublicTrackCode(trackCode: $trackCode) {\n    id\n    trackCode\n    Enterprise {\n      businessName\n      comercialName\n    }\n  }\n}\n",
        })
        .then((res) => {
          const OrderPublicTrackCode = res.data?.data?.OrderPublicTrackCode[0];

          axios
            .post("https://backend.chazki.com", {
              operationName: "getOrderPublic",
              variables: {
                id: OrderPublicTrackCode?.id,
              },
              query:
                "query getOrderPublic($id: Int) {\n  OrderPublic: getOrderPublic(id: $id) {\n    id\n    trackCode\n    cityID\n    packageEnvelope\n    packageWeight\n    packageQuantity\n    productDescription\n    productPrice\n    pickUpAddress\n    pickUpPoint {\n      type\n      coordinates\n    }\n    pickUpPostalCode\n    pickUpAddressReference\n    pickUpPrimaryReference\n    pickUpSecondaryReference\n    pickUpNotes\n    pickUpContactName\n    pickUpContactPhone\n    pickUpContactDocumentNumber\n    pickUpContactEmail\n    dropAddress\n    dropPoint {\n      type\n      coordinates\n    }\n    dropPostalCode\n    dropAddressReference\n    dropPrimaryReference\n    dropSecondaryReference\n    dropNotes\n    dropContactName\n    dropContactPhone\n    dropContactDocumentNumber\n    dropContactEmail\n    urlFileAcuse\n    pickUpDate\n    deliveredDate\n    Service {\n      id\n      name\n    }\n    PaymentMethodID {\n      subtype\n      subclass\n    }\n    PaymentProofID {\n      subtype\n      subclass\n    }\n    Enterprise {\n      id\n      businessName\n      comercialName\n      extra {\n        pickupInfoHidden\n        driverPhoneHidden\n      }\n    }\n    Status {\n      subtype\n      subclass\n    }\n    PackageSizeID {\n      id\n      name\n    }\n    PickUpContactDocumentType {\n      subtype\n      subclass\n    }\n    DropContactDocumentType {\n      subtype\n      subclass\n    }\n    AffiliateRoute {\n      userID\n      User {\n        id\n        names\n        lastname\n        picture\n        phone\n        documentNumber\n      }\n      CurrentVehicle {\n        vehiclePlate\n        CategoryVehicle {\n          subclass\n        }\n      }\n      Routes {\n        id\n        routeCode\n      }\n    }\n    OrdersImages {\n      id\n      GroupImage {\n        subtype\n        subclass\n      }\n      url\n    }\n    DetailRoute {\n      startTime\n      estimatedDuration\n      dispatchNumber\n      isMyOrder\n    }\n    OrderServiceHistorialPublic {\n      statusID\n      createdAt\n    }\n  }\n}\n",
            })
            .then((res) => {
              const OrderPublic = res.data?.data?.OrderPublic;
              const {
                dropNotes,
                dropContactName,
                dropContactPhone,
                trackCode,
                dropPoint: { coordinates },
              } = OrderPublic;
              const linkData = {
                dropNotes,
                trackCode,
                dropContactName,
                dropContactPhone,
                coordinates,
              };
              setLink(linkData);
            });
        })
        .catch((err) => {
          console.log(err);
          // Puedes manejar el error aquí si es necesario.
        });
    }
  }, [trackCode]); // Escucha los cambios en trackCode.

  return link;
}
