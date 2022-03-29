import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { multiply, initZoom, startMeeting } from '@dawi/react-native-zoom-us';

const init_sdk_jwt_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBLZXkiOiJGOG9uYnloNnlBU1BYNGRUdGhZVG5UT3hzWUJORkRXSXBORkEiLCJleHAiOjE2NTExNTIzNjksImlhdCI6MTY0ODU2MDM2OSwidG9rZW5FeHAiOjE2NTExNTIzNjl9.4uTMQd_m3NeH5DRPCJY3UdOLIdXjr8qxTpRAxmxoITk';

const data = {
  meeting_id: '85240514953',
  userName: 'dawi',
  meetingNumber: `85240514953`,
  userId: 'HpIDlQ1CSjWYT17S6V3ZXw',
  zoomAccessToken:
    'eyJ0eXAiOiJKV1QiLCJzdiI6IjAwMDAwMSIsInptX3NrbSI6InptX28ybSIsImFsZyI6IkhTMjU2In0.eyJhdWQiOiJjbGllbnRzbSIsInVpZCI6Ikdud0N6TXo3UXVxNEJhRW1NcVh1YmciLCJpc3MiOiJ3ZWIiLCJzayI6IjAiLCJzdHkiOjk5LCJ3Y2QiOiJ1czA2IiwiY2x0IjowLCJleHAiOjE2NDg1NjA0MjQsImlhdCI6MTY0ODU2MDM2OSwiYWlkIjoidmVreEFVMzBSNzZldmFqSTE4Z1MtUSIsImNpZCI6IiJ9.4d7G7-kQwGNh0IaFn_4AoFE6o0o5w70hG_sqIaftwDE',
};
export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  const steupSdk = async () => await initZoom(init_sdk_jwt_token, 'zoom.us');

  const HostMeeting = async () =>
    await startMeeting({
      meetingNumber: `${data.meeting_id}`,
      zoomAccessToken: data.zoomAccessToken,
      userId: data.userId,
      userName: 'dawi',
      userType: 1,
    });

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Button title="init" color="blue" onPress={steupSdk} />
      <Button title="startMeeting" color="red" onPress={HostMeeting} />
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
