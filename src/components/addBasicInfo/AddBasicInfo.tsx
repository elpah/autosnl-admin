import { useContext, useEffect, useState } from "react";
import DynamicInput from "../dynamicInput/DynamicInput";
import useBrandModel from "../../hooks/useBrandModel";
import {
  GlobalContext,
  type CarTranslationFields,
} from "../../context/GlobalContext";
import styles from "./add-basic-info.module.css";

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

  // useEffect(() => {
  //   if (!isLoading && brandModelData) {
  //     console.log("brandModelData", brandModelData);
  //   }
  // }, [brandModelData]);

  useEffect(() => {
    console.log("carData", globalContext.carData);
  }, [globalContext.carData]);

  const [damageInputs, setDamageInputs] = useState<
    { title: string; text: string }[]
  >([]);

  const handleAddNewInputGroup = () => {
    setDamageInputs((prev) => [...prev, { title: "", text: "" }]);
  };

  const handleInputChange = (
    index: number,
    field: "title" | "text",
    value: string
  ) => {
    const updatedInputs = [...damageInputs];
    updatedInputs[index][field] = value;
    setDamageInputs(updatedInputs);
  };

  const handleSaveDetail = (index: number) => {
    const detail = damageInputs[index];
    if (!detail.title.trim() || !detail.text.trim()) {
      alert("Both title and text are required.");
      return;
    }
    globalContext.setCarData((prev) => {
      const lang = prev.lang[globalContext.currentLanguage];
      return {
        ...prev,
        lang: {
          ...prev.lang,
          [globalContext.currentLanguage]: {
            ...lang,
            carDamageDetails: [...lang.carDamageDetails, detail],
          },
        },
      };
    });

    setDamageInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const updateOther = (field: keyof CarTranslationFields, value: string) => {
    globalContext.setOther((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateTranslationFieldFunction = (
    field: keyof CarTranslationFields,
    value: string
  ) => {
    globalContext.setCarData((prev) => ({
      ...prev,
      lang: {
        ...prev.lang,
        [globalContext.currentLanguage]: {
          ...prev.lang[globalContext.currentLanguage],
          [field]: value,
        },
      },
    }));
  };

  const updateTranslationField = (
    field: keyof CarTranslationFields,
    value: any
  ) => {
    if (value === "other") {
      updateOther(field, value);
      updateTranslationFieldFunction(field, value);
      return;
    }
    updateOther(field, "");
    updateTranslationFieldFunction(field, value);
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
              .carCategory
          }
          onChange={(e) =>
            updateTranslationField("carCategory", e.target.value)
          }
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="used">Used</option>
          <option value="damaged">Damaged</option>
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
          onChange={(e) => updateTranslationField("carBrand", e.target.value)}
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
                updateTranslationFieldFunction("carBrand", e.target.value)
              }
            />
          </>
        )}
      </div>
      <div className={`${styles.form_field} ${styles.model}`}>
        <label htmlFor="model">{modelTag}</label>
        {/* <select
          name="model"
          id="model"
          value={
            globalContext.carData.lang[globalContext.currentLanguage].carModel
          }
          onChange={(e) => updateTranslationField("carModel", e.target.value)}
        >
          <option value="" disabled>
            Select Model
          </option>
          <option value="other">Other</option>
       {globalContext.carData.lang[globalContext.currentLanguage].carBrand &&
          !globalContext.other.carBrand &&
          brandModelData ? (
            Object.keys(
              brandModelData.brands[
                globalContext.carData.lang[globalContext.currentLanguage]
                  .carBrand
              ].models
            ).map((modelName, index) => {
              const model =
                brandModelData.brands[
                  globalContext.carData.lang[globalContext.currentLanguage]
                    .carBrand
                ].models[modelName];
              const modelNameTranslated = model[globalContext.currentLanguage];
              return (
                <option key={index} value={modelName}>
                  {modelNameTranslated}
                </option>
              );
            })
          ) : (
            <option value="" disabled>
              Select a brand first
            </option>
          )}
        </select> */}

        <select
          name="model"
          id="model"
          value={
            globalContext.carData.lang[globalContext.currentLanguage].carModel
          }
          onChange={(e) => updateTranslationField("carModel", e.target.value)}
        >
          {(() => {
            if (!brandModelData?.brands) {
              return (
                <>
                  <option value="" disabled>
                    Select a brand first
                  </option>
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
                  <option value="" disabled>
                    Select a Model
                  </option>
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
                <option value="" disabled>
                  Select a brand first
                </option>
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
              updateTranslationFieldFunction("carModel", e.target.value)
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
          onChange={(e) => updateTranslationField("carCountry", e.target.value)}
        >
          <option value="" disabled>
            Select Country
          </option>
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
        {globalContext.other.carCountry === "other" && (
          <>
            <input
              className={styles.other_input}
              type="text"
              placeholder="Enter new Country"
              value={
                globalContext.carData.lang[globalContext.currentLanguage]
                  .carCountry
              }
              onChange={(e) =>
                updateTranslationFieldFunction("carCountry", e.target.value)
              }
            />
          </>
        )}
      </div>
      <div className={`${styles.form_field} ${styles.body}`}>
        <label htmlFor="body">{bodyTag}</label>
        <select
          name="body"
          id="body"
          value={
            globalContext.carData.lang[globalContext.currentLanguage].carBody
          }
          onChange={(e) => updateTranslationField("carBody", e.target.value)}
        >
          <option value="" disabled>
            Select Body
          </option>
          <option value="other">Other</option>

          {brandModelData &&
            brandModelData.body &&
            Object.keys(brandModelData.body).map((bodyKey, index) => {
              const bodyName =
                brandModelData.body[bodyKey][globalContext.currentLanguage];
              return (
                <option key={index} value={bodyKey}>
                  {bodyName}
                </option>
              );
            })}
        </select>
        {globalContext.other.carBody === "other" && (
          <input
            className={styles.other_input}
            type="text"
            placeholder="Enter new body"
            value={
              globalContext.carData.lang[globalContext.currentLanguage].carBody
            }
            onChange={(e) =>
              updateTranslationFieldFunction("carBody", e.target.value)
            }
          />
        )}
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
          onChange={(e) =>
            updateTranslationField("carTransmission", e.target.value)
          }
        >
          <option value="" disabled>
            Select Transmission
          </option>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
          <option value="hybrid">Hybrid</option>
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
          onChange={(e) => updateTranslationField("carFuel", e.target.value)}
        >
          <option value="" disabled>
            Select Fuel
          </option>
          <option value="other">other</option>
          {brandModelData && brandModelData.fuel ? (
            Object.keys(brandModelData.fuel).map((fuelKey, index) => {
              const fuel = brandModelData.fuel[fuelKey];
              const fuelTranslated = fuel[globalContext.currentLanguage];
              return (
                <option key={index} value={fuelKey}>
                  {fuelTranslated}
                </option>
              );
            })
          ) : (
            <option value="" disabled>
              No Fuel Available
            </option>
          )}
        </select>
        {globalContext.other.carFuel === "other" && (
          <input
            className={styles.other_input}
            type="text"
            placeholder="Enter new body"
            value={
              globalContext.carData.lang[globalContext.currentLanguage].carFuel
            }
            onChange={(e) =>
              updateTranslationFieldFunction("carFuel", e.target.value)
            }
          />
        )}
      </div>
      <div className={`${styles.form_field} ${styles.vanish}`}>
        <label htmlFor="vanish">{vanishTag}</label>
        <select
          name="vanish"
          id="vanish"
          value={
            globalContext.carData.lang[globalContext.currentLanguage].carVanish
          }
          onChange={(e) => updateTranslationField("carVanish", e.target.value)}
        >
          <option value="" disabled>
            Select Vanish
          </option>
          <option value="other">Other</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        {globalContext.other.carVanish === "other" && (
          <input
            className={styles.other_input}
            type="text"
            placeholder="Enter new Vanish"
            value={
              globalContext.carData.lang[globalContext.currentLanguage]
                .carVanish
            }
            onChange={(e) =>
              updateTranslationFieldFunction("carVanish", e.target.value)
            }
          />
        )}
      </div>
      <div className={`${styles.form_field} ${styles.details}`}>
        <label htmlFor="">{detailsTag}</label>
        <input type="text" />
      </div>
      <div className={`${styles.form_field} ${styles.color}`}>
        <label>{colorTag}</label>
        <input
          placeholder="Enter a color"
          type="text"
          value={
            globalContext.carData.lang[globalContext.currentLanguage].carColor
          }
          onChange={(e) => updateTranslationField("carColor", e.target.value)}
        />
      </div>
      <h2>More Information</h2>
      <div className={`${styles.form_field} ${styles.damage_details}`}>
        <label>{damageDetailsTag}</label>

        {damageInputs.map((input, index) => (
          <div key={index} className={styles.details}>
            <label>Title</label>
            <input
              type="text"
              value={input.title}
              onChange={(e) =>
                handleInputChange(index, "title", e.target.value)
              }
            />
            <label>Text</label>
            <input
              type="text"
              value={input.text}
              onChange={(e) => handleInputChange(index, "text", e.target.value)}
            />
            <button type="button" onClick={() => handleSaveDetail(index)}>
              Save
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddNewInputGroup}>
          Add new detail +
        </button>
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
