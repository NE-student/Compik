import { useDispatch, useSelector } from "react-redux";
import "./ComponentEdit.css";
import React from "react";
import {
  Button,
  ButtonContent,
  Form,
  FormField,
  Icon,
} from "semantic-ui-react";
import { useForm } from "react-hook-form";
import axios from "axiosInstance";
import ImageUploader from "Components/Tools/ImageUploader/ImageUploader";
import { updateComponent } from "MyRedux/slices/Component";

function isFileImage(file) {
  return file && file["type"].split("/")[0] === "image";
}

function ComponentEdit(props) {
  const currentComponent = useSelector(
    (state) => state.admin.component.currentComponent
  );
  const onBackClick = props.onBackClick;
  const onRemoveClick = props.onRemoveClick;
  const [imageURL, setImageUrl] = React.useState(currentComponent?.Photos[0]);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    // setError,
    // formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      Name: currentComponent?.Name,
      Description: currentComponent?.Description,
      Price: currentComponent?.Price,
    },
    mode: "onChange",
  });

  

  const OnSubmit = async (params) => {
    if (!imageURL) {
      alert("Завантажте картинку");
      return;
    }
    await dispatch(
      updateComponent({
        ...params,
        id: currentComponent.id,
        Photos: [imageURL],
      })
    );
    alert("Збережено!");
  };

  const onChangeFile = async (e) => {
    if (!isFileImage(e.target.files[0])) {
      alert("Завантажуйте тiльки картинки!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (err) {
      console.log(err);
      alert("Виникла помилка в завантаженi файлу.");
    }
  };

  return (
    <div>
      <div className="flex w-full items-center">
        <Button className=" basis-1/5" labelPosition="right" onClick={onBackClick}>
          <ButtonContent>
            <Icon name="angle left" />
          </ButtonContent>
          Повернутись
        </Button>
        <div className=" basis-4/5 text-right">
          <Button
            color="pink"
            Property="submit"
            className=" transition ease-in-out delay-15 hover:scale-110 duration-200 text-white min-h-6 rounded-lg"
            onClick={handleSubmit(OnSubmit)}
          >
            Зберегти
          </Button>
          <Button onClick={() => onRemoveClick(currentComponent)} color="grey" icon="trash">
            Видалити
          </Button>
        </div>
      </div>

      <ImageUploader onChangeFile={onChangeFile} imageURL={imageURL} />
      <Form>
        <FormField>
          <label className="text-slate-50">Ім'я:</label>
          <input
            autoFocus
            {...register("Name", { required: "Name is required." })}
            className="pl-2 w-full border-2 rounded font-normal"
          />
        </FormField>
        <FormField>
          <label className="text-slate-50">Опис:</label>
          <textarea
            {...register("Description", {
              required: "Description is required.",
            })}
            className="pl-2 w-full border-2 rounded font-normal"
          />
        </FormField>
        <FormField>
          <label className="text-slate-50">Цiна:</label>
          <input
            {...register("Price", { required: "Price is required." })}
            className="pl-2 w-full border-2 rounded font-normal"
            type="number"
            min="1"
            step="any"
          />
        </FormField>
        <div className="flex items-center justify-center mt-5"></div>
      </Form>
    </div>
  );
}

export default ComponentEdit;
