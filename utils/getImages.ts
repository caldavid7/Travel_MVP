import { toast } from "react-toastify";
import { AI_RESPONSE } from "./getOpenaiResponse";

export interface Images {
  placeName: string;
  photo: string;
}

type Photo = {
  height: number;
  html_attributions: string[];
  width: number;
  getUrl: () => string;
};

export async function getImagesFromGoogleMaps(
  openAiResponse: AI_RESPONSE["response"]
): Promise<Images[] | []> {
  if (!openAiResponse?.answer) return [];
  const map = new window.google.maps.Map(document.createElement("div"));
  const service = new window.google.maps.places.PlacesService(map);

  try {
    let result2: google.maps.places.PlaceResult[] = [];

    await Promise.all(
      openAiResponse.answer.map(async (hotel) => {
        return new Promise<void>(async (resolve) => {
          const request = {
            query: hotel.hotel_name,
            fields: ["place_id"],
          };

          service.findPlaceFromQuery(request, async (result, status) => {
            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
              result
            ) {
              const request = {
                placeId: result[0].place_id as string,
                fields: ["name", "photos"],
              };
              // Wrap the callback-based function with a Promise
              const detailsResult = await new Promise<any>((innerResolve) => {
                service.getDetails(request, (result, status) => {
                  console.log(status);
                  if (
                    status ===
                      window.google.maps.places.PlacesServiceStatus.OK &&
                    result
                  ) {
                    innerResolve(result);
                  } else {
                    innerResolve(null);
                  }
                });
              });

              if (detailsResult) {
                // Process the detailsResult here
                result2.push(detailsResult);
              }
            }
            resolve();
          });
        });
      })
    );
    const actualAnswer = result2.map((place) => {
      if (place.photos) {
        const url = findImageWithGreatestHeight(place.photos);
        return { photo: url, placeName: place.name };
      }
    });
    const filteredImages: Images[] = actualAnswer.filter(
      (url) => url?.photo !== undefined
    ) as Images[];
    return filteredImages;
  } catch (e) {
    toast.error("Something went wrong while loading images", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return [];
  }
}

function findImageWithGreatestHeight(photo: Photo[]) {
  if (!Array.isArray(photo) || photo.length === 0) {
    // Check if input is not an array or empty array
    return undefined;
  }

  let perfectImage = photo[0]; // Assume the first number as the greatest

  for (let i = 1; i < photo.length; i++) {
    if (photo[i].height > perfectImage.height) {
      perfectImage = photo[i]; // Update greatest number if a larger number is found
    }
  }

  return perfectImage.getUrl();
}
