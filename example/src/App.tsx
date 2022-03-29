import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import ZoomUs from 'rn-native-zoom-us';
import { fetchData } from './data';

export default function App() {
  console.log('ZoomUs', ZoomUs);
  const [data, setdata] = React.useState<any>(null);

  React.useEffect(() => {
    (() => {
      fetchData().then((data) => {
        setdata(data);
      });
    })();
    return () => {};
  }, []);

  const steupSdk = async () =>
    await ZoomUs.initialize({ jwtToken: data?.init_sdk_jwt_token });

  const HostMeeting = async () =>
    await ZoomUs.startMeeting({
      userName: 'dawi',
      meetingNumber: `${data?.meeting_id}`,
      userId: data?.user_zoom_id,
      zoomAccessToken: data?.zoom_zak_token,
    });

  const isInitial = async () => {
    console.log('isInitialized', await ZoomUs.isInitialized());
  };

  return (
    <View style={styles.container}>
      <Button disabled={!data} title="init" color="blue" onPress={steupSdk} />
      <Button
        disabled={!data}
        title="startMeeting"
        color="red"
        onPress={HostMeeting}
      />
      <Button title="isInitialized" color="red" onPress={isInitial} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
