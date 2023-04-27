import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  HStack,
  Input,
  useRadioGroup,
  Tooltip,
  VStack,
  StackDivider,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { RadioCard } from "../components/Radio";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
const IndexPage = () => {
  const [input, setInput] = useState(String);
  const [names, setNames] = useState(Array<String>);
  const [currAnimation, setcurrAnimation] = useState(String);
  const [showAlert, setshowAlert] = useState(Boolean);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length && e.target.files[0].name.includes(".glb")) {
      setshowAlert(false);
      setInput(URL.createObjectURL(e.target.files[0]));
    } else {
      setshowAlert(true);
    }
  };
  useEffect(() => {
    const modelViewer = document.querySelector("model-viewer");

    if (modelViewer) {
      modelViewer.addEventListener("load", () => {
        console.log("reached");
        const names = (modelViewer as any).availableAnimations;
        setNames(names);
        setcurrAnimation(names[0]);
      });
    }
  }, []);
  const dropHandler = (ev: any) => {
    console.log("File(s) dropped");

    ev.preventDefault();

    if (ev.dataTransfer.items.length === 1) {
      const file: File = ev.dataTransfer.items[0].getAsFile();
      if (file.name.includes(".glb")) {
        setInput(URL.createObjectURL(file));
        setshowAlert(false);
      } else {
        setshowAlert(true);
      }
    }
  };

  const dragOverHandler = (event: any) => {
    event.preventDefault();
  };
  const clickHandler = (event: any) => {
    if (event.target.childNodes[1]) {
      event.target.childNodes[1].click();
    }
  };
  const clickHandlerRadio = (name: any) => {
    setcurrAnimation(name);
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: clickHandlerRadio,
  });
  const group = getRootProps();
  return (
    <>
      {
        // style={{ display: input ? "none" : "" }
        !input && (
          <Box mt="200px" ml="400px">
            <Tooltip label="Drag and drop or Click here" hasArrow>
              <Box
                onDrop={dropHandler}
                borderStyle="dashed"
                maxW="50%"
                maxH="50%"
                h="50vh"
                borderWidth="2px"
                borderRadius="lg"
                textAlign="center"
                onDragOver={dragOverHandler}
                onClick={clickHandler}
                _hover={{ cursor: "pointer" }}
                ml="200px"
              >
                <AddIcon mt="200px" boxSize={10}></AddIcon>

                <Input
                  name="FileInput"
                  type="file"
                  onChange={handleChange}
                  hidden
                  accept=".glb"
                />
              </Box>
            </Tooltip>
          </Box>
        )
      }
      {showAlert && (
        <Alert status="error" mt="200px" width="500px">
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>Only GLB file format is allowed</AlertDescription>
        </Alert>
      )}

      {
        <HStack
          divider={
            input ? (
              <StackDivider borderColor="gray.300" />
            ) : (
              <StackDivider borderColor="white" />
            )
          }
        >
          <model-viewer
            src={input ?? ""}
            autoPlay
            camera-controls
            animation-name={currAnimation}
            style={{ height: "100px", width: "1543px" }}
            shadow-intensity="2"
            frameBorder="1px"
          ></model-viewer>
          <VStack {...group} spacing={6} ml="80px">
            {names.map((value) => {
              const radio = getRadioProps({ value });
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </VStack>
        </HStack>
      }
    </>
  );
};

export default IndexPage;
