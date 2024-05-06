import HaversineDistance from "../utils/haversine";

export default function createAdjacencyList(locations) {
  const adjacencyList = {
    Uptron: [
      {
        name: "Teliyarganj Chauraha",
        distance: HaversineDistance(
          locations["Uptron"],
          locations["Teliyarganj Chauraha"]
        ),
      },
      {
        name: "Army Canteen",
        distance: HaversineDistance(
          locations["Uptron"],
          locations["Army Canteen"]
        ),
      },
    ],
    "Teliyarganj Chauraha": [
      {
        name: "Uptron",
        distance: HaversineDistance(
          locations["Teliyarganj Chauraha"],
          locations["Uptron"]
        ),
      },
      {
        name: "Yamuna Gate",
        distance: HaversineDistance(
          locations["Teliyarganj Chauraha"],
          locations["Yamuna Gate"]
        ),
      },
    ],
    "Yamuna Gate": [
      {
        name: "Teliyarganj Chauraha",
        distance: HaversineDistance(
          locations["Yamuna Gate"],
          locations["Teliyarganj Chauraha"]
        ),
      },
      {
        name: "APS Old Cantt",
        distance: HaversineDistance(
          locations["Yamuna Gate"],
          locations["APS Old Cantt"]
        ),
      },
      {
        name: "Ganga Gate",
        distance: HaversineDistance(
          locations["Yamuna Gate"],
          locations["Ganga Gate"]
        ),
      },
    ],
    "APS Old Cantt": [
      {
        name: "Ganga Gate",
        distance: HaversineDistance(
          locations["APS Old Cantt"],
          locations["Ganga Gate"]
        ),
      },
      {
        name: "Yamuna Gate",
        distance: HaversineDistance(
          locations["APS Old Cantt"],
          locations["Yamuna Gate"]
        ),
      },
    ],
    "Ganga Gate": [
      {
        name: "Yamuna Gate",
        distance: HaversineDistance(
          locations["Ganga Gate"],
          locations["Yamuna Gate"]
        ),
      },
      {
        name: "APS Old Cantt",
        distance: HaversineDistance(
          locations["Ganga Gate"],
          locations["APS Old Cantt"]
        ),
      },
      {
        name: "Army Canteen",
        distance: HaversineDistance(
          locations["Ganga Gate"],
          locations["Army Canteen"]
        ),
      },
    ],
    "Army Canteen": [
      {
        name: "Ganga Gate",
        distance: HaversineDistance(
          locations["Army Canteen"],
          locations["Ganga Gate"]
        ),
      },
      {
        name: "Uptron",
        distance: HaversineDistance(
          locations["Army Canteen"],
          locations["Uptron"]
        ),
      },
      {
        name: "Old Katra",
        distance: HaversineDistance(
          locations["Army Canteen"],
          locations["Old Katra"]
        ),
      },
      {
        name: "Allahabad Uni",
        distance: HaversineDistance(
          locations["Army Canteen"],
          locations["Allahabad Uni"]
        ),
      },
    ],
    "Old Katra": [
      {
        name: "Army Canteen",
        distance: HaversineDistance(
          locations["Old Katra"],
          locations["Army Canteen"]
        ),
      },
      {
        name: "Allahabad Uni",
        distance: HaversineDistance(
          locations["Old Katra"],
          locations["Allahabad Uni"]
        ),
      },
      {
        name: "Katra",
        distance: HaversineDistance(locations["Old Katra"], locations["Katra"]),
      },
      {
        name: "Belly Gaon",
        distance: HaversineDistance(
          locations["Old Katra"],
          locations["Belly Gaon"]
        ),
      },
    ],
    "Belly Gaon": [
      {
        name: "Old Katra",
        distance: HaversineDistance(
          locations["Belly Gaon"],
          locations["Old Katra"]
        ),
      },
      {
        name: "APS Old Cantt",
        distance: HaversineDistance(
          locations["Belly Gaon"],
          locations["APS Old Cantt"]
        ),
      },
      {
        name: "Police Line",
        distance: HaversineDistance(
          locations["Belly Gaon"],
          locations["Police Line"]
        ),
      },
    ],
    "Allahabad Uni": [
      {
        name: "Army Canteen",
        distance: HaversineDistance(
          locations["Allahabad Uni"],
          locations["Army Canteen"]
        ),
      },
      {
        name: "Old Katra",
        distance: HaversineDistance(
          locations["Allahabad Uni"],
          locations["Old Katra"]
        ),
      },
      {
        name: "Tagore Town",
        distance: HaversineDistance(
          locations["Allahabad Uni"],
          locations["Tagore Town"]
        ),
      },
    ],
    "Tagore Town": [
      {
        name: "Katra",
        distance: HaversineDistance(
          locations["Tagore Town"],
          locations["Katra"]
        ),
      },
      {
        name: "Allahabad Uni",
        distance: HaversineDistance(
          locations["Tagore Town"],
          locations["Allahabad Uni"]
        ),
      },
      {
        name: "RamnathPur",
        distance: HaversineDistance(
          locations["Tagore Town"],
          locations["RamnathPur"]
        ),
      },
      {
        name: "CA Park",
        distance: HaversineDistance(
          locations["Tagore Town"],
          locations["CA Park"]
        ),
      },
      {
        name: "Chungi",
        distance: HaversineDistance(
          locations["Tagore Town"],
          locations["Chungi"]
        ),
      },
    ],
    Katra: [
      {
        name: "Police Line",
        distance: HaversineDistance(
          locations["Katra"],
          locations["Police Line"]
        ),
      },
      {
        name: "Old Katra",
        distance: HaversineDistance(locations["Katra"], locations["Old Katra"]),
      },
      {
        name: "Tagore Town",
        distance: HaversineDistance(
          locations["Katra"],
          locations["Tagore Town"]
        ),
      },
    ],
    "Police Line": [
      {
        name: "CA Park",
        distance: HaversineDistance(
          locations["Police Line"],
          locations["CA Park"]
        ),
      },
      {
        name: "Belly Gaon",
        distance: HaversineDistance(
          locations["Police Line"],
          locations["Belly Gaon"]
        ),
      },
      {
        name: "Katra",
        distance: HaversineDistance(
          locations["Police Line"],
          locations["Katra"]
        ),
      },
      {
        name: "Allahabad High Court",
        distance: HaversineDistance(
          locations["Police Line"],
          locations["Allahabad High Court"]
        ),
      },
    ],
    Chungi: [
      {
        name: "CMP Degree College",
        distance: HaversineDistance(
          locations["Chungi"],
          locations["CMP Degree College"]
        ),
      },
      {
        name: "Tagore Town",
        distance: HaversineDistance(
          locations["Chungi"],
          locations["Tagore Town"]
        ),
      },
    ],
    "CMP Degree College": [
      {
        name: "RamnathPur",
        distance: HaversineDistance(
          locations["CMP Degree College"],
          locations["RamnathPur"]
        ),
      },
      {
        name: "Chungi",
        distance: HaversineDistance(
          locations["CMP Degree College"],
          locations["Chungi"]
        ),
      },
    ],
    RamnathPur: [
      {
        name: "CMP Degree College",
        distance: HaversineDistance(
          locations["RamnathPur"],
          locations["CMP Degree College"]
        ),
      },
      {
        name: "Tagore Town",
        distance: HaversineDistance(
          locations["RamnathPur"],
          locations["Tagore Town"]
        ),
      },
      {
        name: "Civil Lines",
        distance: HaversineDistance(
          locations["RamnathPur"],
          locations["Civil Lines"]
        ),
      },
      {
        name: "Prayagraj Bus Stand",
        distance: HaversineDistance(
          locations["RamnathPur"],
          locations["Prayagraj Bus Stand"]
        ),
      },
    ],
    "CA Park": [
      {
        name: "Police Line",
        distance: HaversineDistance(
          locations["CA Park"],
          locations["Police Line"]
        ),
      },
      {
        name: "Tagore Town",
        distance: HaversineDistance(
          locations["CA Park"],
          locations["Tagore Town"]
        ),
      },
    ],
    "Allahabad High Court": [
      {
        name: "Civil Lines",
        distance: HaversineDistance(
          locations["Allahabad High Court"],
          locations["Civil Lines"]
        ),
      },
      {
        name: "Police Line",
        distance: HaversineDistance(
          locations["Allahabad High Court"],
          locations["Police Line"]
        ),
      },
      {
        name: "All Saints Cathedral",
        distance: HaversineDistance(
          locations["Allahabad High Court"],
          locations["All Saints Cathedral"]
        ),
      },
    ],
    "Civil Lines": [
      {
        name: "Allahabad High Court",
        distance: HaversineDistance(
          locations["Civil Lines"],
          locations["Allahabad High Court"]
        ),
      },
      {
        name: "RamnathPur",
        distance: HaversineDistance(
          locations["Civil Lines"],
          locations["RamnathPur"]
        ),
      },
    ],
    SSB: [
      {
        name: "Allahabad High Court",
        distance: HaversineDistance(
          locations["SSB"],
          locations["Allahabad High Court"]
        ),
      },
      {
        name: "Prayagraj Junction",
        distance: HaversineDistance(
          locations["SSB"],
          locations["Prayagraj Junction"]
        ),
      },
    ],
    "Prayagraj Junction": [
      {
        name: "SSB",
        distance: HaversineDistance(
          locations["Prayagraj Junction"],
          locations["SSB"]
        ),
      },
      {
        name: "Prayagraj Bus Stand",
        distance: HaversineDistance(
          locations["Prayagraj Junction"],
          locations["Prayagraj Bus Stand"]
        ),
      },
    ],
    "Prayagraj Bus Stand": [
      {
        name: "Prayagraj Junction",
        distance: HaversineDistance(
          locations["Prayagraj Bus Stand"],
          locations["Prayagraj Junction"]
        ),
      },
      {
        name: "RamnathPur",
        distance: HaversineDistance(
          locations["Prayagraj Bus Stand"],
          locations["RamnathPur"]
        ),
      },
      {
        name: "All Saints Cathedral",
        distance: HaversineDistance(
          locations["Prayagraj Bus Stand"],
          locations["All Saints Cathedral"]
        ),
      },
    ],
    "All Saints Cathedral": [
      {
        name: "Prayagraj Bus Stand",
        distance: HaversineDistance(
          locations["All Saints Cathedral"],
          locations["Prayagraj Bus Stand"]
        ),
      },
      {
        name: "Allahabad High Court",
        distance: HaversineDistance(
          locations["All Saints Cathedral"],
          locations["Allahabad High Court"]
        ),
      },
    ],
  };
  return adjacencyList;
}
