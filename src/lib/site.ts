export const site = {
  name: "Shanzen Enterprises",
  tagline: "Grocery, household and general merchandise",
  phoneDisplay: "+1 (307) 400-4140",
  phoneHref: "tel:+13074004140",
  email: "sales@shanzenenterprises.com",
  address: {
    line1: "30 N Gould St Ste R",
    city: "Sheridan",
    state: "WY",
    zip: "82801",
    country: "United States",
  },
  hours: "Mon – Fri, 8:00 AM – 6:00 PM MT",
};

export const addressOneLine = `${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.zip}, ${site.address.country}`;
