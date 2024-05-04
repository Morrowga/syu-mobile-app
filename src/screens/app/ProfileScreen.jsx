import { StyleSheet, View } from "react-native";
import { Avatar,Stack, Box,Heading, Input, Select, Text,ScrollView, CheckIcon,FormControl,WarningOutlineIcon} from "native-base";

const ProfileScreen = () => (
  // <ScrollView h="80">
    <Box m={5} textAlign="center" height="100%" rounded="xl">
      <Heading>Profile Details</Heading>
      <Box mt={10}>
        <Stack space={2} w="75%" maxW="300px" mx="auto">
          <FormControl maxW="300" isRequired isInvalid>
            <FormControl.Label>Username</FormControl.Label>
            <Input size="lg" placeholder="Username" rounded="full" />
            {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Please enter username
            </FormControl.ErrorMessage> */}
          </FormControl>
          <FormControl maxW="300" isRequired isInvalid>
            <FormControl.Label>Email Address</FormControl.Label>
            <Input size="lg" placeholder="Email" rounded="full" />
            {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Please enter email address
            </FormControl.ErrorMessage> */}
          </FormControl>
          <FormControl maxW="300" isRequired isInvalid>
            <FormControl.Label>Phone</FormControl.Label>
            <Input size="lg" placeholder="Phone" rounded="full" />
            {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Please enter phone
            </FormControl.ErrorMessage> */}
          </FormControl>
          <FormControl maxW="300" isRequired isInvalid>
            <FormControl.Label>City</FormControl.Label>
            <Input size="lg" placeholder="City" rounded="full" />
            {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Please enter city
            </FormControl.ErrorMessage> */}
          </FormControl>
          <FormControl maxW="300" isRequired isInvalid>
            <FormControl.Label>Shipping Address</FormControl.Label>
            <Input size="lg" placeholder="Shipping Address" rounded="full" />
            {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Please enter shipping address
            </FormControl.ErrorMessage> */}
          </FormControl>
          <FormControl maxW="300" isRequired isInvalid>
            <FormControl.Label>Gender</FormControl.Label>
            <Select minWidth="200" accessibilityLabel="Gender" size="lg" placeholder="Gender" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size={5} />
          }} mt="1">
            <Select.Item label="Male" value="male" />
            <Select.Item label="Female" value="female" />
            <Select.Item label="Others" value="others" />
            </Select>
            {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Please make a selection!
            </FormControl.ErrorMessage> */}
          </FormControl>
        </Stack>
      </Box>
    </Box>
  // </ScrollView>
);
const styles = StyleSheet.create({
});
export default ProfileScreen;
