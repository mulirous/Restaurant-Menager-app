const { Reserva } = require('../models');

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Reserva.getAll();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: "Erro ao requisitar as reservas" });
        console.log(error)
    }
};

exports.createBooking = async (req, res) => {
    try {
        const booking = await Reserva.createBooking(req.body);
        res.status(201).json({ id: booking.id });
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar reserva" });
    }
};

exports.updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    try {
        await Reserva.updateStatus(id);
        res.status(200).json({ message: "Status atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar status" });
    }
};
