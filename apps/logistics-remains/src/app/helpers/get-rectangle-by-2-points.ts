export const getMongoRectangleBy2Points = (
  [lngBL, latBL]: [lngBL: number, latBL: number],
  [lngTR, latTR]: [lngTR: number, latTR: number]
): number[][][] => {
  // creating clockwise from
  // bottom left
  // top left
  // top right
  // bottom right
  //
  /* 
  const example = [
    [50.01965917799224, 30.22131917773438],
    [50.01965917799224, 55.08826253710938],
    [58.0151324849334, 55.08826253710938],
    [58.0151324849334, 30.22131917773438],
    [50.01965917799224, 30.22131917773438],
  ];*/
  const finalPolygon = [
    [
      [lngBL, latBL],
      [lngBL, latTR],
      [lngTR, latTR],
      [lngTR, latBL],
      [lngBL, latBL],
    ],
  ];
  console.log(finalPolygon);
  return finalPolygon;
};
