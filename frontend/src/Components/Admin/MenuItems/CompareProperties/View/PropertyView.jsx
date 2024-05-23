import "./PropertyView.css";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import {
  fetchCompareProperties,
  nextPage,
  previousPage,
  removeCompareProperty,
  updateCompareProperty,
} from "MyRedux/slices/CompareProperty";
import {
  createComparePropertyValue,
  fetchComparePropertyValues,
  resetPage as resetValuePage,
  nextPage as nextValuePage,
  previousPage as previousValuePage,
} from "MyRedux/slices/ComparePropertyValue";
import { fetchTypes } from "MyRedux/slices/Type";
import { useForm } from "react-hook-form";
import TableView from "../../../../Tools/TableView/TableView";
import ModalOfObject from "../../../../Tools/ModalOfObject/ModalOfObject";
import DropdownRelation from "../../../../Tools/DropdownRelation/DropdownRelation";
import { Divider, Header } from "semantic-ui-react";
import FormVED from "Components/Tools/FormVED/FormVED";
import DropdownVED from "Components/Tools/DropdownVED/DropdownVED";
import {
  createComparePropertyImpactCategory,
  fetchComparePropertyImpactCategories,
} from "MyRedux/slices/ComparePropertyImpactCategory";

function PropertyView(props) {
  const propertiesData = props.propertiesData;
  const propertyValuesData = useSelector(
    (state) => state.admin.comparePropertyValue
  );
  const propertyImpactCategoriesData = useSelector(
    (state) => state.admin.comparePropertyImpactCategory
  );
  const typesData = useSelector((state) => state.admin.type);
  const categoriesData = useSelector((state) => state.admin.category);

  const [open, setOpen] = React.useState(false);
  const [Property, setProperty] = React.useState(null);
  const [PropertyId, setId] = React.useState(null);
  const [PropertyName, setName] = React.useState("");
  const [PropertyDescription, setDescription] = React.useState("");
  const [PropertyType, setType] = React.useState();
  const [PropertyCategory, setCategory] = React.useState();
  const [typeId, setTypeId] = React.useState(0);
  const [categoryId, setCategoryId] = React.useState(0);
  const [impactCategoryId, setImpactCategoryId] = React.useState(null);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchCompareProperties(propertiesData.currentPage));
    dispatch(fetchTypes());
  }, [dispatch, propertiesData.currentPage]);

  React.useEffect(() => {
    dispatch(
      fetchComparePropertyValues({
        page: propertyValuesData.currentPage,
        id: PropertyId,
      })
    );
  }, [propertyValuesData.currentPage, PropertyId, dispatch])

  const propertyFields = [
    {
      name: "Name",
      options: { required: "Name is required." },
      placeholder: "number",
    },
    {
      name: "Description",
      options: { required: "Description is required." },
      placeholder: "",
    },
    {
      name: "isCountable",
      options: {},
      placeholder: "",
      type: "checkbox",
    },
  ];

  const propertyCreateForm = useForm({
    defaultValues: {
      id: 0,
      Name: "",
      Description: "",
      isCountable: false,
    },
    values: {
      id: PropertyId,
      Name: PropertyName,
      Description: PropertyDescription,
      isCountable: Property?.isCountable,
    },
    mode: "onChange",
  });

  const OnPropertySubmit = async (params) => {
    await dispatch(
      updateCompareProperty({ ...params, type: typeId, category: categoryId })
    );
    dispatch(fetchCompareProperties(propertiesData.currentPage));
    setOpen(false);
  };

  const onRowClick = async (Property) => {
    setProperty(Property);
    setId(Property.id);
    setName(Property.Name);
    setDescription(Property.Description);
    setType(Property.type);
    setTypeId(Property.type.id);
    setCategory(Property.category);
    setCategoryId(Property.category.id);
    setOpen(true);
    await dispatch(
      fetchComparePropertyValues({
        page: propertyValuesData.currentPage,
        id: Property.id,
      })
    );
    await dispatch(
      fetchComparePropertyImpactCategories({
        page: propertyImpactCategoriesData.currentPage,
        id: Property.id,
      })
    );
    await dispatch(resetValuePage());
  };

  const onLeftArrClick = () => {
    dispatch(previousPage());
  };
  const onRightArrClick = () => {
    dispatch(nextPage());
  };

  const propertyValueCreateForm = useForm({
    defaultValues: {
      id: 0,
      Value: "",
    },

    mode: "onChange",
  });

  const propertyValueFields = [
    {
      name: "id",
      options: { required: "Id is required." },
    },
    {
      name: "Value",
      options: { required: "Value is required." },
      placeholder: "",
    },
  ];
  const OnPropertyValueSubmit = async (params) => {
    const p = {
      id: PropertyId,
      value: params.Value,
    };
    await dispatch(createComparePropertyValue(p));
    dispatch(
      fetchComparePropertyValues({
        page: propertyValuesData.currentPage,
        id: PropertyId,
      })
    );
  };

  const onTypeChange = async (_, data) => {
    data.options.forEach((item) => {
      if (item.value === data.value) {
        setTypeId(item.key);
        return;
      }
    });
  };
  const onCategoryChange = async (_, data) => {
    data.options.forEach((item) => {
      if (item.value === data.value) {
        setCategoryId(item.key);
        return;
      }
    });
  };
  const onImpactCategoryChange = (_, data) => {
    data.options.forEach((item) => {
      if (item.value === data.value) {
        setImpactCategoryId(item.key);
        return;
      }
    });
  };
  const onImpactCategoryDropdownAdd = async () => {
    await dispatch(
      createComparePropertyImpactCategory({
        id: PropertyId,
        categoryId: impactCategoryId,
      })
    );
    dispatch(
      fetchComparePropertyImpactCategories({
        page: propertyImpactCategoriesData.currentPage,
        id: PropertyId,
      })
    );
  };

  return (
    <>
      <TableView
        Tittle="Характеристики"
        ColumnsTittle={["id", "Назва", "Категорія"]}
        ColumnsKeys={["id", "Name", "category"]}
        dataToView={propertiesData.properties?.data}
        onRowClick={onRowClick}
        onLeftArrClick={onLeftArrClick}
        onRightArrClick={onRightArrClick}
        currentPage={propertiesData?.currentPage}
        isLastPage={
          propertiesData?.properties &&
          Boolean(propertiesData?.properties?.data.length)
        }
        uniqueKey="properties"
      />
      <ModalOfObject
        Tittle="Редагування характеристики"
        fields={propertyFields}
        onModalClose={() => setOpen(false)}
        onModalOpen={() => setOpen(true)}
        stateOfModal={open}
        onSubmit={propertyCreateForm.handleSubmit(OnPropertySubmit)}
        register={propertyCreateForm.register}
        onTrashClick={async () => {
          await dispatch(removeCompareProperty(PropertyId));
          dispatch(fetchCompareProperties(propertiesData.currentPage));
          setOpen(false);
        }}
        addBottom={
          <>
            <Divider />
            <Header>Relations</Header>
            <DropdownRelation
              Tittle={"Категорія"}
              dataToView={categoriesData.categories?.data}
              defaultValue={PropertyCategory?.Name}
              dataKeys={{ key: "id", value: "Name", text: "Name" }}
              onChange={onCategoryChange}
            />
            <DropdownRelation
              Tittle={"Тип даних характеристики"}
              dataToView={typesData.types?.data}
              defaultValue={PropertyType?.Name}
              dataKeys={{ key: "id", value: "Name", text: "Name" }}
              onChange={onTypeChange}
            />
            {PropertyType?.Name !== "boolean" && (
              <FormVED
                Tittle={"Значення характеристик"}
                ColumnsKeys={["value"]}
                fields={propertyValueFields}
                register={propertyValueCreateForm.register}
                onSubmit={propertyValueCreateForm.handleSubmit(
                  OnPropertyValueSubmit
                )}
                dataToView={propertyValuesData.propertyValues?.data}
                currentPage={propertyValuesData?.currentPage}
                isLastPage={
                  propertyValuesData?.propertyValues &&
                  Boolean(propertyValuesData?.propertyValues?.data.length)
                }
                onLeftArrClick={() => {
                  dispatch(previousValuePage());
                }}
                onRightArrClick={() => {
                  dispatch(nextValuePage());
                }}
                uniqueKey="comparePropertyValues"
              />
            )}
            <DropdownVED
              Tittle={"Вплив на категор"}
              ColumnsKeys={["Name"]}
              //  data = dataToView;
              dataToView={propertyImpactCategoriesData.propertyImpactCategories?.data
                .slice()
                .map((value) => {
                  return value.category;
                })}
              uniqueKey="propertyImpactCategories"
              DropdownData={categoriesData.categories?.data}
              onDropdownValueChange={onImpactCategoryChange}
              onDropdownAdd={onImpactCategoryDropdownAdd}
            />
          </>
        }
      />
    </>
  );
}

export default PropertyView;
