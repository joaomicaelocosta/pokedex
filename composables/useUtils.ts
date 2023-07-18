export const useUtils = () => {
  const useColorByType = (type: string) => {
    let color: string = "";
    switch (type) {
      case "grass":
        color = "bg-green-400";
        break;
      case "fire":
        color = "bg-red-500";
        break;
      case "water":
        color = "bg-blue-400";
        break;
      case "bug":
        color = "bg-green-600";
        break;
      case "normal":
        color = "bg-gray-400";
        break;
      case "poison":
        color = "bg-purple-600";
        break;
      case "electric":
        color = "bg-yellow-400";
        break;
      case "ground":
        color = "bg-yellow-600";
        break;
      case "fairy":
        color = "bg-pink-400";
        break;
      case "fighting":
        color = "bg-red-400";
        break;
      case "psychic":
        color = "bg-pink-600";
        break;
      case "rock":
        color = "bg-amber-900";
        break;
      case "ghost":
        color = "bg-purple-400";
        break;
      case "ice":
        color = "bg-blue-200";
        break;
      case "dragon":
        color = "bg-blue-700";
        break;
      case "dark":
        color = "bg-dark";
        break;
      case "steel":
        color = "bg-gray-700";
        break;
      case "flying":
        color = " bg-blue-500";
        break;
    }
    return color;
  };

  const useDeSlugify = (slug: string) => {
    return slug.replace(/-/g, " ");
  };

  return { useColorByType, useDeSlugify };
};
