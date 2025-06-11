import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Divider,
  Alert,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


/* ---------------------------------------------------
 *  helpers
 * --------------------------------------------------*/
const fileToBase64 = file =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });

/* ---------------------------------------------------
 *  validation schemas
 * --------------------------------------------------*/
const orgSchema = Yup.object({
  orphanageName: Yup.string().required(),
  organiserFirstName: Yup.string().required(),
  organiserLastName: Yup.string().required(),
  orphanagePhoneNumber: Yup.string()
    .matches(/^\d{10}$/, '10‑digit phone required')
    .required(),
  regNo: Yup.string().required(),
});

const passwordSchema = Yup.object({
  newPassword: Yup.string().min(6).required(),
});

const orphanageSchema = Yup.object({
  orphans: Yup.number().min(1, 'At least one child').required(),
  goal: Yup.number()
    // .min(10_000, 'Goal too small')
    // .max(1_000_000, 'Goal too large')
    .required(),
  donationReceived: Yup.number().min(0).required(),
  address: Yup.string()
    .min(10, 'Too short')
    .matches(/[A-Za-z].*\d|\d.*[A-Za-z]/, 'Must look like a street')
    .required(),
  orphanageName: Yup.string().required(),
  registrationId: Yup.string().required(),
  mainImage: Yup.string().required('Please upload the main image'),
});

/* ===================================================
 *  Component
 * ===================================================*/
 const OrganisationProfile=({onClosePane}) => {
  const email = localStorage.getItem('orgemail');

  const [orgData, setOrgData] = useState(null);
  const [orphanageData, setOrphanageData] = useState(null);
  const [openEditOrg, setOpenEditOrg] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openOrphanageForm, setOpenOrphanageForm] = useState(false);
  const [isEditOrphanage, setIsEditOrphanage] = useState(false);
  const [message, setMessage] = useState('');
   
  const navigate = useNavigate();
  /* ----------------- react‑hook‑form instances ------------------*/
  const {
    control: orgControl,
    handleSubmit: submitOrg,
    reset: resetOrg,
    formState: { errors: orgErrors },
  } = useForm({ resolver: yupResolver(orgSchema) });

  const {
    control: pwControl,
    handleSubmit: submitPw,
    reset: resetPw,
    formState: { errors: pwErrors },
  } = useForm({ resolver: yupResolver(passwordSchema) });

  const {
    control: orphControl,
    handleSubmit: submitOrphanage,
    reset: resetOrph,
    setValue: setOrphValue,
    formState: { errors: orphErrors },
  } = useForm({ resolver: yupResolver(orphanageSchema) });

  /* ----------------- fetch organiser + orphanage ----------------*/
  useEffect(() => {
    if (!email) return;
    axios
      .get(`http://localhost:9090/api/auth/org/get/${email}`)
      .then(({ data }) => {
        setOrgData(data);
        resetOrg(data);
      })
      .catch(() => setMessage('Failed to fetch organisation'));

    axios
      .get(`http://localhost:9091/orphanages/get/${email}`)
      .then(({ data }) => setOrphanageData(data))
      .catch(() => setOrphanageData(null));
  }, [email, resetOrg]);

  /* ----------------- donation total fetch ----------------------*/
  const fetchDonationTotal = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:9091/donations/total-amount/${email}`
      );
      // Write & validate
      setOrphValue('donationReceived', data ?? 0, { shouldValidate: true });
    } catch {
      setOrphValue('donationReceived', 0, { shouldValidate: true });
    }
  }, [email, setOrphValue]);

  /* ----------------- open dialogs helpers ---------------------*/
  const openAddOrph = () => {
    resetOrph();
    setIsEditOrphanage(false);
    // pre‑fill name & regId from organiser if available
    if (orgData) {
      setOrphValue('orphanageName', orgData.orphanageName || '');
      setOrphValue('registrationId', orgData.regNo || '');
    }
    setOrphValue('emailId', email);
    fetchDonationTotal();
    setOpenOrphanageForm(true);
  };

  const openEditOrph = () => {
    if (!orphanageData) return;
    resetOrph(orphanageData);
    setIsEditOrphanage(true);
    fetchDonationTotal();
    setOpenOrphanageForm(true);
  };



  /* ----------------- CRUD calls -------------------------------*/
  const saveOrg = data =>
    axios
      .put(`http://localhost:9090/api/auth/org/update/${email}`, data)
      .then(({ data }) => {
        setOrgData(data);
        setMessage('Organisation updated');
        setOpenEditOrg(false);
      })
      .catch(() => setMessage('Organisation update failed'));

  const changePw = ({ newPassword }) => {
  if (newPassword.length < 8) {
    setMessage("Minimum 8 characters");
    return;
  }
  if (!/[a-z]/.test(newPassword)) {
    setMessage("At least one lowercase letter");
    return;
  }
  if (!/[A-Z]/.test(newPassword)) {
    setMessage("At least one uppercase letter");
    return;
  }
  if (!/[0-9]/.test(newPassword)) {
    setMessage("At least one number");
    return;
  }
  if (!/[@$!%*?&]/.test(newPassword)) {
    setMessage("At least one special character (@$!%*?&)");
    return;
  }

  axios
    .put(
      `http://localhost:9090/api/auth/org/update/password/${email}/${newPassword}`
    )
    .then(() => {
      setMessage("Password changed");
      setOpenPassword(false);
      resetPw();
    })
    .catch(() => setMessage("Password change failed"));
};

  const saveOrphanage = data => {
    const req = isEditOrphanage
      ? axios.put(`http://localhost:9091/orphanages/update/${email}`, data)
      : axios.post(`http://localhost:9091/orphanages/add`, data);

    req
      .then(({ data }) => {
        setOrphanageData(data);
        setMessage(isEditOrphanage ? 'Orphanage updated' : 'Orphanage added');
        setOpenOrphanageForm(false);
      })
      .catch(() =>
        setMessage(isEditOrphanage ? 'Update failed' : 'Creation failed')
      );
  };

  const deleteOrphanage = () =>
    axios
      .delete(`http://localhost:9091/orphanages/delete/${email}`)
      .then(() => {
        setOrphanageData(null);
        setMessage('Deleted');
      })
      .catch(() => setMessage('Deletion failed'));

   const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    if(onClosePane) onClosePane();
  };

  /* ----------------- render -----------------------------------*/
  if (!orgData)
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Loading…
      </Typography>
    );

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          My Profile
        </Typography>

        {message && (
          <Alert
            severity={message.toLowerCase().includes('fail') ? 'error' : 'success'}
            sx={{ mb: 2 }}
          >
            {message}
          </Alert>
        )}

        <Divider sx={{ mb: 3 }} />

        {/* ------------ organiser details -------------*/}
        <Typography>
          <strong>Email:</strong> {orgData.email}
        </Typography>
        <Typography>
          <strong>Orphanage Name:</strong> {orgData.orphanageName}
        </Typography>
        <Typography>
          <strong>First Name:</strong> {orgData.organiserFirstName}
        </Typography>
        <Typography>
          <strong>Last Name:</strong> {orgData.organiserLastName}
        </Typography>
        <Typography>
          <strong>Phone:</strong> {orgData.orphanagePhoneNumber}
        </Typography>
        <Typography>
          <strong>Reg No:</strong> {orgData.regNo}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button variant="outlined" onClick={() => setOpenEditOrg(true)}>
            Edit Profile
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenPassword(true)}
          >
            Change Password
          </Button>
          <Button variant="contained" color="success" onClick={() => navigate("/donations-recived")}>
                      Donations Recieved
                    </Button>
          

          <Button variant="outlined" color="error" onClick={handleLogout}>
                      Logout
                    </Button>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* ------------ orphanage summary -------------*/}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5">Orphanage</Typography>
          {!orphanageData && (
            <Button variant="contained" onClick={openAddOrph}>
              Add Orphanage
            </Button>
          )}
        </Box>

        {orphanageData ? (
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <strong>Name:</strong> {orphanageData.orphanageName}
                </Typography>
                <Typography>
                  <strong>Address:</strong> {orphanageData.address}
                </Typography>
                <Typography>
                  <strong>Orphans:</strong> {orphanageData.orphans}
                </Typography>
                <Typography>
                  <strong>Goal:</strong> ₹{orphanageData.goal}
                </Typography>
                <Typography>
                  <strong>Donation Received:</strong> ₹
                  {orphanageData.donationReceived}
                </Typography>
                <Typography>
                  <strong>Registration ID:</strong> {orphanageData.registrationId}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                {orphanageData.mainImage && (
                  <img
                    src={orphanageData.mainImage}
                    alt="Main"
                    style={{
                      width: '100%',
                      maxHeight: 200,
                      objectFit: 'cover',
                      borderRadius: 4,
                    }}
                  />
                )}
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={openEditOrph}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={deleteOrphanage}
              >
                Delete
              </Button>
            </Box>
          </Paper>
        ) : (
          <Typography>No orphanage data</Typography>
        )}

        {/* =========================================================
         *  EDIT ORGANISER DIALOG
         * ========================================================*/}
        <Dialog
          open={openEditOrg}
          onClose={() => setOpenEditOrg(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            {/* --- form fields, identical to earlier version --- */}
            {/* orphanageName */}
            <Controller
              name="orphanageName"
              control={orgControl}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Orphanage Name"
                  fullWidth
                  margin="normal"
                  error={!!orgErrors.orphanageName}
                  helperText={orgErrors.orphanageName?.message}
                />
              )}
            />
            {/* organiserFirstName */}
            <Controller
              name="organiserFirstName"
              control={orgControl}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  margin="normal"
                  error={!!orgErrors.organiserFirstName}
                  helperText={orgErrors.organiserFirstName?.message}
                />
              )}
            />
            {/* organiserLastName */}
            <Controller
              name="organiserLastName"
              control={orgControl}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  error={!!orgErrors.organiserLastName}
                  helperText={orgErrors.organiserLastName?.message}
                />
              )}
            />
            {/* phone */}
            <Controller
              name="orphanagePhoneNumber"
              control={orgControl}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  fullWidth
                  margin="normal"
                  error={!!orgErrors.orphanagePhoneNumber}
                  helperText={orgErrors.orphanagePhoneNumber?.message}
                />
              )}
            />
            {/* regNo */}
            <Controller
              name="regNo"
              control={orgControl}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Registration No"
                  fullWidth
                  margin="normal"
                  error={!!orgErrors.regNo}
                  helperText={orgErrors.regNo?.message}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditOrg(false)}>Cancel</Button>
            <Button onClick={submitOrg(saveOrg)} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* =========================================================
         *  CHANGE PASSWORD DIALOG
         * ========================================================*/}
        <Dialog
          open={openPassword}
          onClose={() => setOpenPassword(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <Controller
              name="newPassword"
              control={pwControl}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="New Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={!!pwErrors.newPassword}
                  helperText={pwErrors.newPassword?.message}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPassword(false)}>Cancel</Button>
            <Button onClick={submitPw(changePw)} variant="contained">
              Update
            </Button>
          </DialogActions>
        </Dialog>

        {/* =========================================================
         *  ADD / EDIT ORPHANAGE DIALOG
         * ========================================================*/}
        <Dialog
          open={openOrphanageForm}
          onClose={() => setOpenOrphanageForm(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>{isEditOrphanage ? 'Edit' : 'Add'} Orphanage</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="dense"
              label="Email"
              value={email}
              disabled
            />

            {/* orphans */}
            <Controller
              name="orphans"
              control={orphControl}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Number of Orphans"
                  type="number"
                  fullWidth
                  margin="dense"
                  error={!!orphErrors.orphans}
                  helperText={orphErrors.orphans?.message}
                />
              )}
            />
            {/* goal */}
            <Controller
              name="goal"
              control={orphControl}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Goal (₹)"
                  type="number"
                  fullWidth
                  margin="dense"
                  error={!!orphErrors.goal}
                  helperText={orphErrors.goal?.message}
                />
              )}
            />
            {/* donationReceived (read‑only) */}
            <Controller
              name="donationReceived"
              control={orphControl}
              defaultValue={0}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Donation Received (₹)"
                  type="number"
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                  error={!!orphErrors.donationReceived}
                  helperText={orphErrors.donationReceived?.message}
                />
              )}
            />
            {/* address */}
            <Controller
              name="address"
              control={orphControl}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  fullWidth
                  margin="dense"
                  error={!!orphErrors.address}
                  helperText={orphErrors.address?.message}
                />
              )}
            />
            {/* orphanageName */}
            <Controller
              name="orphanageName"
              control={orphControl}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Orphanage Name"
                  fullWidth
                  margin="dense"
                  error={!!orphErrors.orphanageName}
                  helperText={orphErrors.orphanageName?.message}
                />
              )}
            />
            {/* registrationId */}
            <Controller
              name="registrationId"
              control={orphControl}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Registration ID"
                  fullWidth
                  margin="dense"
                  error={!!orphErrors.registrationId}
                  helperText={orphErrors.registrationId?.message}
                />
              )}
            />

            {/* main image */}
            <Box mt={2}>
              <Typography variant="subtitle2">Main Image</Typography>
              <input
                type="file"
                accept="image/*"
                onChange={async e => {
                  const f = e.target.files?.[0];
                  if (f) {
                    const b64 = await fileToBase64(f);
                    setOrphValue('mainImage', b64, { shouldValidate: true });
                  }
                }}
              />
              {orphErrors.mainImage && (
                <Typography color="error" variant="caption">
                  {orphErrors.mainImage.message}
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenOrphanageForm(false)}>Cancel</Button>
            <Button onClick={submitOrphanage(saveOrphanage)} variant="contained">
              {isEditOrphanage ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
}
export default OrganisationProfile;