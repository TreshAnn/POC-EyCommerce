import {
  Modal,
  Stack,
  Button,
  TextInput,
  Group,
  NumberInput,
  Text,
  Textarea,
  rem,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useDisclosure } from '@mantine/hooks';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import React from 'react';
import { Form } from 'ui';
import * as z from 'zod';

// type productImgArray = {
//   path: string[];
//   pathName: string[];
// };

type TcreateProduct = {
  productID: string;
  productImg: string[];
  productName: string;
  productInfo: string;
  productPrice: number;
  productInventory: number;
  productCategory: string[];
};

const schema = z.object({
  productID: z.string().includes('product', {
    message: 'Includes product before number. (ex: product02123)',
  }),
  productImg: z.string(),
  productName: z.string(),
  productInfo: z.string(),
  productPrice: z.number(),
  productInventory: z.number(),
  productCategory: z.string(),
});

const CreateProduct = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const handleOnSubmit = (values) => {
    // eslint-disable-next-line no-console
    console.log(values);
    //createProductMutation.mutate({ ...rq });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Product Item" centered>
        <Form<TcreateProduct, typeof schema>
          onSubmit={(values) => handleOnSubmit(values)}
          schema={schema}
        >
          {({ formState, register, setValue }) => (
            <>
              <Stack>
                <TextInput
                  label="Product ID"
                  placeholder="Enter Product ID..."
                  required
                  error={formState.errors['productID']?.message}
                  {...register('productID')}
                />
                <TextInput
                  label="Name"
                  placeholder="Enter Product Name..."
                  required
                  error={formState.errors['productName']?.message}
                  {...register('productName')}
                />
                <Textarea
                  label="Description"
                  placeholder="Enter Product Description..."
                  required
                  error={formState.errors['productInfo']?.message}
                  {...register('productInfo')}
                />
                <NumberInput
                  label="Price"
                  placeholder="299.00"
                  hideControls
                  required
                  icon={
                    <Text size="sm" color="black">
                      ₱
                    </Text>
                  }
                  error={formState.errors['productPrice']?.message}
                  onChange={(selectedValue: number) => {
                    setValue('productPrice', selectedValue);
                  }}
                />
                <Group>
                  <TextInput
                    label="Category"
                    placeholder="Enter Category Tag..."
                    error={formState.errors['productCategory']?.message}
                    {...register('productCategory')}
                  />
                  <Button variant="filled" type="button"></Button>
                </Group>

                <Dropzone
                  onDrop={(file) => {
                    //const filePaths: string[] | "" = file.map((drop) => drop.path);
                    //setValue(`productImg`, filePaths);
                    // eslint-disable-next-line no-console
                    console.log(file);
                  }}
                  onReject={(files) =>
                    // eslint-disable-next-line no-console
                    console.log('rejected files', files)
                  }
                  maxSize={3 * 1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
                  // {...register('productImg')}
                >
                  <Group
                    position="center"
                    spacing="xl"
                    style={{ minHeight: rem(110), pointerEvents: 'none' }}
                  >
                    <Dropzone.Accept>
                      <IconUpload size="3.2rem" stroke={1.5} />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX size="3.2rem" stroke={1.5} />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <IconPhoto size="3.2rem" stroke={1.5} />
                    </Dropzone.Idle>
                    <div>
                      <Text size="xl" inline>
                        Drag images here or click to select files
                      </Text>
                      <Text size="sm" color="dimmed" inline mt={7}>
                        Attach as many files as you like, each file should not
                        exceed 5mb
                      </Text>
                    </div>
                  </Group>
                </Dropzone>
                <Textarea
                  label="Image URL"
                  placeholder="Enter IMG URL..."
                  required
                  error={formState.errors['productImg']?.message}
                  {...register('productImg')}
                />
                <Button
                  variant="filled"
                  type="submit"
                  style={{ backgroundColor: '#FFD500', color: '#333333' }}
                >
                  Submit
                </Button>
              </Stack>
            </>
          )}
        </Form>
      </Modal>
      <Group position="center">
        <Button onClick={open}>Open centered Modal</Button>
      </Group>
    </>
  );
};

export default CreateProduct;
