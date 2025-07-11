import { useContext } from "react";
import DynamicInput from "../dynamic-input/DynamicInput";
import useBrandModel from "../../hooks/useBrandModel";
import {
  GlobalContext,
  type CarTranslationFields,
} from "../../context/GlobalContext";

import styles from "./add-basic-info.module.css";
import DamageDetailForm from "../damage-details-form/DamageDetailsForm";

type AddBasicInfoProps = {
  categoryTag: string;
  brandTag: string;
  modelTag: string;
  countryTag: string;
  bodyTag: string;
  transmissionTag: string;
  fuelTag: string;
  vanishTag: string;
  detailsTag: string;
  colorTag: string;
  damageDetailsTag: string;
  carOptionsTag: string;
};
const AddBasicInfo = ({
  categoryTag,
  brandTag,
  modelTag,
  countryTag,
  bodyTag,
  transmissionTag,
  fuelTag,
  vanishTag,
  detailsTag,
  colorTag,
  damageDetailsTag,
  carOptionsTag,
}: AddBasicInfoProps) => {
  const globalContext = useContext(GlobalContext);
  const { data: brandModelData, isLoading } = useBrandModel();

  const vanishData: any = {
    yes: {
      en: "Yes",
      nl: "Ja",
      ru: "Да",
      ua: "Так",
    },
    no: {
      en: "No",
      nl: "Nee",
      ru: "Нет",
      ua: "Ні",
    },
  };

  const category: any = {
    used: {
      en: "Used",
      nl: "Gebruikt",
      ru: "Использованный",
      ua: "Використаний",
    },
    damaged: {
      en: "Damaged",
      nl: "Beschadigd",
      ru: "Поврежденный",
      ua: "Пошкоджений",
    },
  };

  const updateOther = (field: keyof CarTranslationFields, value: string) => {
    globalContext.setOther((prev) => ({
      ...prev,

      [field]: value,
    }));
  };

  const updateTranslationFieldFunctionBrandModel = (
    field: keyof CarTranslationFields,
    valueEn: string,
    valueNl: string,
    valueRu: string,
    valueUa: string
  ) => {
    if (
      valueEn !== "other" &&
      valueNl !== "other" &&
      valueRu !== "other" &&
      valueUa !== "other"
    ) {
      updateOther(field, "");
    }
    globalContext.setCarData((prev) => ({
      ...prev,
      lang: {
        ...prev.lang,
        ...(valueEn && {
          en: {
            ...prev.lang.en,
            [field]: valueEn,
          },
        }),
        ...(valueNl && {
          nl: {
            ...prev.lang.nl,
            [field]: valueNl,
          },
        }),
        ...(valueRu && {
          ru: {
            ...prev.lang.ru,
            [field]: valueRu,
          },
        }),
        ...(valueUa && {
          ua: {
            ...prev.lang.ua,
            [field]: valueUa,
          },
        }),
      },
    }));
  };


  const updateTranslationFieldFunctionOthers = (
    field: keyof CarTranslationFields,
    value: string
  ) => {
    globalContext.setCarData((prev) => ({
      ...prev,
      lang: {
        ...prev.lang,
        [globalContext.currentLanguage]: {
          ...(prev.lang?.[globalContext.currentLanguage] || {}),
          [field]: value,
        },
      },
    }));
  };

  const updateTranslationOthers = (
    field: keyof CarTranslationFields,
    value: any
  ) => {
    if (value === "other") {
      updateOther(field, value);

      updateTranslationFieldFunctionOthers(field, value);
      return;
    }
    // updateOther(field, "");
    // updateTranslationFieldFunctionOthers(field, value);
  };

  const updateTranslationField = (
    field: keyof CarTranslationFields,
    valueEn: any,
    valueNl: any,
    valueRu: any,
    valueUa: any
  ) => {
    if (valueEn === "other") {
      updateOther(field, valueEn);
      updateTranslationFieldFunctionBrandModel(
        field,
        valueEn,
        valueNl,
        valueRu,
        valueUa
      );
      return;
    }
    updateOther(field, "");
    updateTranslationFieldFunctionBrandModel(
      field,
      valueEn,
      valueNl,
      valueRu,
      valueUa
    );
  };

  if (isLoading) return <div>isLoading</div>;

  return (
    <div className={styles.container}>
      <div className={`${styles.form_field} ${styles.category}`}>
        <label htmlFor="category">{categoryTag}</label>
        <select
          name="category"
          id="category"
          value={
            globalContext.carData.lang[globalContext.currentLanguage]
              .carType
          }
          onChange={(e) => {
            const selectedCat = Object.keys(category).find((key) => {
              return (
                category[key][globalContext.currentLanguage] === e.target.value
              );
            });

            if (selectedCat) {
              const translations = category[selectedCat];
              updateTranslationFieldFunctionBrandModel(
                "carType",
                translations?.en || "",
                translations?.nl || "",
                translations?.ru || "",
                translations?.ua || ""
              );
            }
          }}
        >
          <option value="" disabled>
            Select Category
          </option>
          {Object.keys(category).map((catKey, index) => {
            const categoryName =
              category[catKey][globalContext.currentLanguage];
            return (
              <option key={index} value={categoryName}>
                {categoryName}
              </option>
            );
          })}
        </select>
      </div>
      <div className={`${styles.form_field} ${styles.brand}`}>
        <label htmlFor="brand">{brandTag}</label>
        <select
          name="brand"
          id="brand"
          value={
            globalContext.carData.lang[globalContext.currentLanguage].carBrand
          }
          onChange={(e) => {
            if (e.target.value === "other") {
              updateOther("carBrand", e.target.value);
              updateTranslationFieldFunctionBrandModel(
                "carBrand",
                e.target.value,
                e.target.value,
                e.target.value,
                e.target.value
              );
              return;
            }

            const selectedBrandKey = Object.keys(brandModelData!.brands).find(
              (key) => {
                return (
                  brandModelData?.brands[key].name[
                    globalContext.currentLanguage
                  ] === e.target.value
                );
              }
            );

            if (selectedBrandKey) {
              const translations =
                brandModelData?.brands[selectedBrandKey].name;
              updateTranslationFieldFunctionBrandModel(
                "carBrand",
                translations?.en || "",
                translations?.nl || "",
                translations?.ru || "",
                translations?.ua || ""
              );
            }
          }}
        >
          <option value="" disabled>
            Select Brand
          </option>
          <option value="other">Other</option>
          {brandModelData &&
            brandModelData.brands &&
            Object.keys(brandModelData.brands).map((brand) => {
              const brandData = brandModelData.brands[brand];
              const brandName = brandData.name[globalContext.currentLanguage];
              return (
                <option key={brand} value={brandName}>
                  {brandName}
                </option>
              );
            })}
        </select>
        {globalContext.other.carBrand === "other" && (
          <>
            <input
              className={styles.other_input}
              type="text"
              placeholder="Enter new brand"
              value={
                globalContext.carData.lang[globalContext.currentLanguage]
                  .carBrand
              }
              onChange={(e) =>
                updateTranslationFieldFunctionOthers("carBrand", e.target.value)
              }
            />
          </>
        )}
      </div>
      <div className={`${styles.form_field} ${styles.model}`}>
        <label htmlFor="model">{modelTag}</label>
        <select
          name="model"
          id="model"
          value={
            globalContext.carData.lang[globalContext.currentLanguage].carModel
          }
          onChange={(e) => {
            if (e.target.value === "other") {
              updateOther("carModel", e.target.value);
              updateTranslationFieldFunctionBrandModel(
                "carModel",
                e.target.value,
                e.target.value,
                e.target.value,
                e.target.value
              );

              return;
            }
            const selectedLabel = e.target.value;
            const selectedBrandKey =
              globalContext.carData.lang.en.carBrand.toLowerCase();

            const brandData = brandModelData?.brands[selectedBrandKey];
            if (!brandData) return;

            const modelEntry = Object.entries(brandData.models).find(
              ([_key, translations]) =>
                translations.en === selectedLabel ||
                translations.ru === selectedLabel ||
                translations.ua === selectedLabel ||
                translations.nl === selectedLabel
            );

            if (modelEntry) {
              const [_modelKey, translations] = modelEntry;

              updateTranslationFieldFunctionBrandModel(
                "carModel",
                translations.en || "",
                translations.nl || "",
                translations.ru || "",
                translations.ua || ""
              );
            }
          }}
        >
          {(() => {
            if (!brandModelData?.brands) {
              return (
                <>
                  <option disabled>Select a brand first</option>
                  <option value="other">Other</option>
                </>
              );
            }
            const selectedBrandLabel =
              globalContext.carData.lang[globalContext.currentLanguage]
                .carBrand;
            const matchedBrandKey = Object.entries(brandModelData.brands).find(
              ([, brandData]) =>
                brandData.name[globalContext.currentLanguage].toLowerCase() ===
                selectedBrandLabel.toLowerCase()
            )?.[0];

            const matchedBrand = matchedBrandKey
              ? brandModelData.brands[matchedBrandKey]
              : null;

            if (matchedBrand) {
              return (
                <>
                  <option disabled>Select a Model</option>
                  <option value="other">Other</option>
                  {Object.entries(matchedBrand.models).map(
                    ([modelKey, modelData]) => {
                      const translatedModel =
                        modelData[globalContext.currentLanguage];
                      return (
                        <option key={modelKey} value={translatedModel}>
                          {translatedModel}
                        </option>
                      );
                    }
                  )}
                </>
              );
            }

            return (
              <>
                <option disabled>Select a brand first</option>
                <option value="other">Other</option>
              </>
            );
          })()}
        </select>
        {globalContext.other.carModel === "other" && (
          <input
            className={styles.other_input}
            type="text"
            placeholder="Enter new model"
            value={
              globalContext.carData.lang[globalContext.currentLanguage].carModel
            }
            onChange={(e) =>
              updateTranslationFieldFunctionOthers("carModel", e.target.value)
            }
          />
        )}
      </div>
      <div className={`${styles.form_field} ${styles.country}`}>
        <label htmlFor="country">{countryTag}</label>
        <select
          name="country"
          id="country"
          value={
            globalContext.carData.lang[globalContext.currentLanguage].carCountry
          }
          onChange={(e) => {
            console.log("e.target.value:", e.target.value);

            const selectedCountryKeys = Object.keys(
              brandModelData!.countries
            ).find((key) => {
              return (
                brandModelData?.countries[key][
                  globalContext.currentLanguage
                ] === e.target.value
              );
            });

            if (selectedCountryKeys) {
              const translations =
                brandModelData?.countries[selectedCountryKeys];
              updateTranslationFieldFunctionBrandModel(
                "carCountry",
                translations?.en || "",
                translations?.nl || "",
                translations?.ru || "",
                translations?.ua || ""
              );
            }
          }}
        >
          <option disabled>Select Country</option>
          <option value="other">Select Country</option>
          {brandModelData &&
            brandModelData.countries &&
            Object.keys(brandModelData.countries).map((countryKey, index) => {
              const countryName =
                brandModelData.countries[countryKey][
                  globalContext.currentLanguage
                ];
              return (
                <option key={index} value={countryName}>
                  {countryName}
                </option>
              );
            })}
        </select>
      </div>
      <div className={`${styles.form_field} ${styles.body}`}>
        <label htmlFor="body">{bodyTag}</label>

        <select
          name="body"
          id="body"
          value={
            globalContext.carData.lang[globalContext.currentLanguage].carBody
          }
          onChange={(e) => {
            const selectedBodyKeys = Object.keys(brandModelData!.body).find(
              (key) => {
                return (
                  brandModelData!.body[key][globalContext.currentLanguage] ===
                  e.target.value
                );
              }
            );

            if (selectedBodyKeys) {
              const translations = brandModelData?.body[selectedBodyKeys];
              updateTranslationFieldFunctionBrandModel(
                "carBody",
                translations?.en || "",
                translations?.nl || "",
                translations?.ru || "",
                translations?.ua || ""
              );
            }
          }}
        >
          <option disabled>Select Body</option>
          {brandModelData &&
            brandModelData.body &&
            Object.keys(brandModelData.body).map((bodyKey, index) => {
              const bodyName =
                brandModelData.body[bodyKey][globalContext.currentLanguage];
              return (
                <option key={index} value={bodyName}>
                  {bodyName}
                </option>
              );
            })}
        </select>
      </div>
      <div className={`${styles.form_field} ${styles.transmission}`}>
        <label htmlFor="transmission">{transmissionTag}</label>
        <select
          name="transmission"
          id="transmission"
          value={
            globalContext.carData.lang[globalContext.currentLanguage]
              .carTransmission
          }
          onChange={(e) => {
            const selectedTransmissionKeys = Object.keys(
              brandModelData!.transmission
            ).find((key) => {
              return (
                brandModelData!.transmission[key][
                  globalContext.currentLanguage
                ] === e.target.value
              );
            });

            if (selectedTransmissionKeys) {
              const translations =
                brandModelData?.transmission[selectedTransmissionKeys];
              updateTranslationFieldFunctionBrandModel(
                "carTransmission",
                translations?.en || "",
                translations?.nl || "",
                translations?.ru || "",
                translations?.ua || ""
              );
            }
          }}
        >
          <option disabled>Select Transmission</option>

          {brandModelData &&
            brandModelData.transmission &&
            Object.keys(brandModelData.transmission).map(
              (transmissionKey, index) => {
                const transmissionName =
                  brandModelData.transmission[transmissionKey][
                    globalContext.currentLanguage
                  ];
                return (
                  <option key={index} value={transmissionName}>
                    {transmissionName}
                  </option>
                );
              }
            )}
        </select>
      </div>
      <div className={`${styles.form_field} ${styles.fuel}`}>
        <label htmlFor="fuel">{fuelTag}</label>
        <select
          name="fuel"
          id="fuel"
          value={
            globalContext.carData.lang[globalContext.currentLanguage].carFuel
          }
          onChange={(e) => {
            const selectedFuelKeys = Object.keys(brandModelData!.fuel).find(
              (key) => {
                return (
                  brandModelData!.fuel[key][globalContext.currentLanguage] ===
                  e.target.value
                );
              }
            );

            if (selectedFuelKeys) {
              const translations = brandModelData?.fuel[selectedFuelKeys];
              updateTranslationFieldFunctionBrandModel(
                "carFuel",
                translations?.en || "",
                translations?.nl || "",
                translations?.ru || "",
                translations?.ua || ""
              );
            }
          }}
        >
          <option disabled>Select Fuel</option>
          {brandModelData &&
            brandModelData.fuel &&
            Object.keys(brandModelData.fuel).map((fuelKey, index) => {
              const fuelName =
                brandModelData.fuel[fuelKey][globalContext.currentLanguage];
              return (
                <option key={index} value={fuelName}>
                  {fuelName}
                </option>
              );
            })}
        </select>
      </div>
      <div className={`${styles.form_field} ${styles.vanish}`}>
        <label htmlFor="vanish">{vanishTag}</label>
        <select
          name="vanish"
          id="vanish"
          value={
            globalContext.carData.lang[globalContext.currentLanguage].carVanish
          }
          onChange={(e) => {
            const selectedVanish = Object.keys(vanishData).find((key) => {
              return (
                vanishData[key][globalContext.currentLanguage] === e.target.value
              );
            });

            if (selectedVanish) {
              console.log(selectedVanish);
              const translations = vanishData[selectedVanish];
              updateTranslationFieldFunctionBrandModel(
                "carVanish",
                translations.en || "",
                translations.nl || "",
                translations.ru || "",
                translations.ua || ""
              );
            }
          }}
        >
          <option disabled>Select Vanish</option>

          {Object.keys(vanishData).map((vanishKey, index) => {
            const vanishName = vanishData[vanishKey][globalContext.currentLanguage];
            return (
              <option key={index} value={vanishName}>
                {vanishName}
              </option>
            );
          })}
        </select>
      </div>
      <div className={`${styles.form_field} ${styles.details}`}>
        <label htmlFor="">{detailsTag}</label>
        <input
          type="text"
          value={
            globalContext.carData.lang[globalContext.currentLanguage].carDetails
          }
          onChange={(e) =>
            updateTranslationFieldFunctionOthers("carDetails", e.target.value)
          }
        />
      </div>
      <div className={`${styles.form_field} ${styles.color}`}>
        <label>{colorTag}</label>
        <input
          placeholder="Enter a color"
          type="text"
          value={
            globalContext.carData.lang[globalContext.currentLanguage].carColor
          }
          onChange={(e) =>
            updateTranslationFieldFunctionOthers("carColor", e.target.value)
          }
        />
      </div>
      <h2>More Information</h2>
      <div className={`${styles.form_field} ${styles.damage_details}`}>
        <label>{damageDetailsTag}</label>
        <DamageDetailForm />
      </div>

      <div className={`${styles.form_field} ${styles.options_container}`}>
        <label>{carOptionsTag}</label>
        <DynamicInput label="Airbag" optionKey="airbag" />
        <DynamicInput
          label="Cooling and Heating"
          optionKey="coolingAndHeating"
        />
        <DynamicInput label="Security" optionKey="security" />
        <DynamicInput label="Entertainment" optionKey="entertainment" />
        <DynamicInput label="Comfort Interior" optionKey="comfortInterior" />
        <DynamicInput label="Comfort Exterior" optionKey="comfortExterior" />
        <DynamicInput label="Safety" optionKey="safety" />
        <DynamicInput label="Lighting" optionKey="lighting" />
      </div>
    </div>
  );
};

export default AddBasicInfo;
